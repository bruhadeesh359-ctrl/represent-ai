import os
import uuid
from fastapi import APIRouter, Request, HTTPException, BackgroundTasks
from typing import Dict, Any
from database import db
from services.razorpay.client import verify_webhook_signature

router = APIRouter()

RAZORPAY_WEBHOOK_SECRET = os.environ.get("RAZORPAY_WEBHOOK_SECRET", "")

@router.post("/razorpay")
async def razorpay_webhook(request: Request, background_tasks: BackgroundTasks):
    payload = await request.body()
    signature = request.headers.get("x-razorpay-signature")
    
    if RAZORPAY_WEBHOOK_SECRET and signature:
        is_valid = verify_webhook_signature(payload.decode("utf-8"), signature, RAZORPAY_WEBHOOK_SECRET)
        if not is_valid:
            raise HTTPException(status_code=400, detail="Invalid webhook signature")
            
    # For MVP we will accept JSON assuming it's valid if no secret is configured (local dev)
    try:
        event_data = await request.json()
    except:
        raise HTTPException(status_code=400, detail="Invalid JSON payload")

    event_type = event_data.get("event")
    
    if event_type == "dispute.created":
        dispute = event_data.get("payload", {}).get("dispute", {}).get("entity", {})
        if dispute and db:
            # We don't block the webhook response, persist in background
            background_tasks.add_task(persist_dispute, dispute)
            
    return {"status": "received"}

def persist_dispute(dispute_entity: Dict[str, Any]):
    if not db:
        return
    # Check if exists
    existing = db.table("disputes").select("id").eq("razorpay_dispute_id", dispute_entity["id"]).execute()
    if existing.data:
        return # Already ingested
        
    # In a real app we'd fetch the payment details from Razorpay or our DB.
    # For demo, if payment doesn't exist, we skip or create a stub.
    db.table("disputes").insert({
        "razorpay_dispute_id": dispute_entity["id"],
        "amount": dispute_entity.get("amount", 0),
        "currency": dispute_entity.get("currency", "INR"),
        "reason_code": dispute_entity.get("reason_code", "unknown"),
        "status": "open",
        "phase": dispute_entity.get("phase", "chargeback"),
        "respond_by": dispute_entity.get("respond_by")
    }).execute()

@router.post("/demo/simulate-dispute")
def simulate_dispute(case_index: int = 0):
    """
    Demo endpoint to generate a synthetic dispute since Test Mode lacks an on-demand generator.
    We just pull a case from our seeded database that hasn't been investigated yet and return it.
    Or we trigger the webhook logic manually.
    """
    if not db:
        raise HTTPException(status_code=500, detail="DB not configured")
        
    # Get a dispute that doesn't have a completed investigation
    response = db.table("disputes").select("*, investigations(status)").eq("status", "open").execute()
    if not response.data:
         raise HTTPException(status_code=404, detail="No uninvestigated seed disputes found")
         
    return {"message": "Simulated dispute fetched successfully", "dispute": response.data[0]}
