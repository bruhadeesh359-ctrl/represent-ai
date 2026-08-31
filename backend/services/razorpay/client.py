import os
import razorpay
from typing import Dict, Any, List

RAZORPAY_KEY_ID = os.environ.get("RAZORPAY_KEY_ID", "")
RAZORPAY_KEY_SECRET = os.environ.get("RAZORPAY_KEY_SECRET", "")

client = None
if RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET:
    client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

import requests

def verify_webhook_signature(payload: str, signature: str, secret: str) -> bool:
    if not client:
        return False
    try:
        client.utility.verify_webhook_signature(payload, signature, secret)
        return True
    except razorpay.errors.SignatureVerificationError:
        return False

def upload_document(file_path: str) -> str:
    """Uploads a document to Razorpay and returns the document ID."""
    if not RAZORPAY_KEY_ID or not RAZORPAY_KEY_SECRET:
        raise Exception("Razorpay keys not configured")
        
    url = "https://api.razorpay.com/v1/documents"
    
    with open(file_path, "rb") as f:
        files = {"file": f}
        data = {"purpose": "dispute_evidence"}
        response = requests.post(url, auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET), files=files, data=data)
        
    response.raise_for_status()
    return response.json().get("id")

def contest_dispute(dispute_id: str, amount: int, summary: str, document_ids: List[str]) -> Dict[str, Any]:
    """Contests a dispute on Razorpay."""
    if not RAZORPAY_KEY_ID or not RAZORPAY_KEY_SECRET:
        raise Exception("Razorpay keys not configured")
        
    url = f"https://api.razorpay.com/v1/disputes/{dispute_id}/contest"
    payload = {
        "amount": amount,
        "summary": summary,
        "evidence": {
            "proof_of_delivery": document_ids
        }
    }
    
    response = requests.post(
        url, 
        auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET), 
        json=payload, 
        headers={"Content-Type": "application/json"}
    )
    
    response.raise_for_status()
    return response.json()
