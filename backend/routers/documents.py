import os
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from ..database import db
from ..services.pdf_generator import generate_dispute_response_pdf

router = APIRouter()

@router.post("/{investigation_id}/generate-pdf")
def generate_pdf(investigation_id: str):
    """
    Generate the evidence package PDF based on a completed investigation.
    """
    if not db:
        raise HTTPException(status_code=500, detail="Database not configured")
        
    # Fetch investigation
    inv_resp = db.table("investigations").select("*, disputes(*)").eq("id", investigation_id).execute()
    if not inv_resp.data:
        raise HTTPException(status_code=404, detail="Investigation not found")
    
    investigation = inv_resp.data[0]
    dispute = investigation.get("disputes", {})
    
    if investigation.get("status") != "COMPLETED":
        raise HTTPException(status_code=400, detail="Investigation must be completed to generate PDF")
        
    # Fetch evidence
    ev_resp = db.table("evidence").select("*").eq("investigation_id", investigation_id).execute()
    evidence_claims = ev_resp.data
    
    # Ensure a directory exists for outputs
    os.makedirs("generated_pdfs", exist_ok=True)
    pdf_path = f"generated_pdfs/{investigation_id}.pdf"
    
    # Generate PDF
    generate_dispute_response_pdf(investigation, evidence_claims, dispute, pdf_path)
    
    return {"message": "PDF generated", "path": pdf_path}

@router.get("/{investigation_id}/download-pdf")
def download_pdf(investigation_id: str):
    pdf_path = f"generated_pdfs/{investigation_id}.pdf"
    if not os.path.exists(pdf_path):
        raise HTTPException(status_code=404, detail="PDF not found. Generate it first.")
    
    return FileResponse(pdf_path, filename=f"RepresentAI_Response_{investigation_id[:8]}.pdf", media_type='application/pdf')

@router.post("/{investigation_id}/submit")
def submit_to_razorpay(investigation_id: str):
    """
    Simulated endpoint for merchant approval and Razorpay submission.
    """
    if not db:
        raise HTTPException(status_code=500, detail="Database not configured")
        
    # Audit log
    db.table("audit_logs").insert({
        "investigation_id": investigation_id,
        "action": "Merchant Approved and Submitted to Razorpay",
        "details": {"method": "mock_simulation"}
    }).execute()
    
    # Update dispute status to under_review
    inv_resp = db.table("investigations").select("dispute_id").eq("id", investigation_id).execute()
    if inv_resp.data:
        dispute_id = inv_resp.data[0]["dispute_id"]
        db.table("disputes").update({"status": "under_review"}).eq("id", dispute_id).execute()
        
    return {"message": "Dispute response submitted successfully"}
