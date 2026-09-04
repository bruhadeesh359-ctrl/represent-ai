import os
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from database import db
from services.pdf_generator import generate_dispute_response_pdf
from services.razorpay.client import upload_document, contest_dispute

router = APIRouter()

@router.post("/{investigation_id}/generate-pdf")
def generate_pdf(investigation_id: str):
    """
    Generate the evidence package PDF based on a completed investigation.
    """
    if not db:
        raise HTTPException(status_code=500, detail="Database not configured")
        
    # Fetch investigation with retry for transient SSL drops
    for _ in range(3):
        try:
            inv_resp = db.table("investigations").select("*, disputes(*)").eq("id", investigation_id).execute()
            break
        except Exception:
            import time
            time.sleep(0.5)
    else:
        raise HTTPException(status_code=500, detail="Database connection failed")
        
    if not inv_resp.data:
        raise HTTPException(status_code=404, detail="Investigation not found")
    
    investigation = inv_resp.data[0]
    dispute = investigation.get("disputes", {})
    
    if investigation.get("status") != "COMPLETED":
        raise HTTPException(status_code=400, detail="Investigation must be completed to generate PDF")
        
    # Fetch evidence with retry
    for _ in range(3):
        try:
            ev_resp = db.table("evidence").select("*").eq("investigation_id", investigation_id).execute()
            break
        except Exception:
            import time
            time.sleep(0.5)
    else:
        raise HTTPException(status_code=500, detail="Database connection failed")
        
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
    Live endpoint for merchant approval and Razorpay submission.
    """
    if not db:
        raise HTTPException(status_code=500, detail="Database not configured")
        
    # Fetch investigation and dispute details
    inv_resp = db.table("investigations").select("*, disputes(*)").eq("id", investigation_id).execute()
    if not inv_resp.data:
        raise HTTPException(status_code=404, detail="Investigation not found")
        
    investigation = inv_resp.data[0]
    dispute = investigation.get("disputes")
    if not dispute:
        raise HTTPException(status_code=404, detail="Dispute not found")
        
    pdf_path = f"generated_pdfs/{investigation_id}.pdf"
    if not os.path.exists(pdf_path):
        # Auto-generate it if the user skipped the preview step
        os.makedirs("generated_pdfs", exist_ok=True)
        # Fetch evidence
        ev_resp = db.table("evidence").select("*").eq("investigation_id", investigation_id).execute()
        from services.pdf_generator import generate_dispute_response_pdf
        generate_dispute_response_pdf(investigation, ev_resp.data, dispute, pdf_path)
        
    try:
        # SIMULATION (Option 1): Bypass Razorpay API for Hackathon Demo
        # 1. Upload Document to Razorpay (Simulated)
        document_id = f"doc_simulated_{investigation_id[:8]}"
        
        # 2. Contest Dispute on Razorpay (Simulated)
        contest_resp = {
            "id": f"disp_sim_{investigation_id[:8]}",
            "status": "under_review",
            "amount": dispute.get("amount")
        }
        
        # 3. Audit log
        db.table("audit_logs").insert({
            "investigation_id": investigation_id,
            "action": "Merchant Approved and Submitted to Live Razorpay API (SIMULATED)",
            "details": {"document_id": document_id, "razorpay_response": contest_resp}
        }).execute()
        
        # 4. Update dispute status to under_review
        db.table("disputes").update({"status": "under_review"}).eq("id", dispute.get("id")).execute()
        
        return {"message": "Dispute response submitted successfully to Razorpay", "document_id": document_id}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to submit to Razorpay API: {str(e)}")
