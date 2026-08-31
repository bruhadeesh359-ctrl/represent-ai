import datetime
from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from database import db
from ai.tools import get_payment, get_order_by_payment, get_shipping, get_customer_messages
from ai.gemini_client import analyze_dispute_context
from ai.validator import validate_evidence

router = APIRouter()

@router.post("/{dispute_id}/investigate")
def run_investigation(dispute_id: str):
    """
    Run the bounded investigation workflow for a dispute.
    """
    if not db:
        raise HTTPException(status_code=500, detail="Database not configured")
        
    # 1. Fetch Dispute
    resp = db.table("disputes").select("*").eq("id", dispute_id).execute()
    if not resp.data:
        raise HTTPException(status_code=404, detail="Dispute not found")
    dispute = resp.data[0]
    
    # Check if investigation already exists and is completed
    inv_resp = db.table("investigations").select("*").eq("dispute_id", dispute_id).execute()
    investigation = inv_resp.data[0] if inv_resp.data else None
    
    if not investigation:
        # Create it
        inv_insert = db.table("investigations").insert({
            "dispute_id": dispute_id,
            "status": "IN_PROGRESS"
        }).execute()
        investigation_id = inv_insert.data[0]["id"]
    else:
        investigation_id = investigation["id"]
        if investigation["status"] == "COMPLETED":
            return {"message": "Investigation already completed", "investigation_id": investigation_id}
            
        db.table("investigations").update({"status": "IN_PROGRESS"}).eq("id", investigation_id).execute()

    # 2. Collect Evidence (Deterministic Tool Calling)
    payment = get_payment(dispute.get("payment_id"))
    order = get_order_by_payment(dispute.get("payment_id"))
    order_id = order.get("order_id") if order else None
    
    shipping = get_shipping(order_id) if order_id else {}
    messages = get_customer_messages(order_id) if order_id else []
    
    # 3. AI Reasoning
    raw_context = {
        "dispute": dispute,
        "payment": payment,
        "order": order,
        "shipping": shipping,
        "messages": messages
    }
    
    ai_result = analyze_dispute_context(
        dispute=dispute,
        payment=payment,
        order=order,
        shipping=shipping,
        messages=messages
    )
    
    if not ai_result:
        db.table("investigations").update({"status": "FAILED"}).eq("id", investigation_id).execute()
        raise HTTPException(status_code=500, detail="AI analysis failed")
        
    # 4. Deterministic Validation
    validated_result = validate_evidence(ai_result, raw_context)
    
    # 5. Save Results
    db.table("investigations").update({
        "status": "COMPLETED",
        "decision": validated_result.decision,
        "confidence": validated_result.confidence,
        "reasoning_summary": validated_result.summary,
        "completed_at": datetime.datetime.now(datetime.timezone.utc).isoformat()
    }).eq("id", investigation_id).execute()
    
    # Clear old evidence if re-running
    db.table("evidence").delete().eq("investigation_id", investigation_id).execute()
    
    # Save Evidence Claims
    evidence_inserts = []
    for ev in validated_result.supporting_evidence + validated_result.contradicting_evidence:
        evidence_inserts.append({
            "id": ev.evidence_id,
            "investigation_id": investigation_id,
            "source": ev.source,
            "evidence_type": ev.evidence_type,
            "claim": ev.claim,
            "value": ev.value,
            "verified": True # validated by our strict checking
        })
        
    if evidence_inserts:
        db.table("evidence").insert(evidence_inserts).execute()
        
    # 6. Audit Log
    db.table("audit_logs").insert({
        "investigation_id": investigation_id,
        "action": "Investigation Completed",
        "details": {"decision": validated_result.decision, "confidence": validated_result.confidence}
    }).execute()

    return {
        "message": "Investigation completed successfully",
        "investigation_id": investigation_id,
        "decision": validated_result.decision
    }
