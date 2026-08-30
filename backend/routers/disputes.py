from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List
from ..database import db

router = APIRouter()

@router.get("/")
def get_all_disputes() -> List[Dict[str, Any]]:
    """Get all disputes for the dashboard."""
    if not db:
        raise HTTPException(status_code=500, detail="Database not configured")
    # Fetch disputes ordered by created_at desc
    response = db.table("disputes").select("*, investigations(status)").order("created_at", desc=True).execute()
    return response.data

@router.get("/{dispute_id}")
def get_dispute(dispute_id: str) -> Dict[str, Any]:
    """Get single dispute details."""
    if not db:
        raise HTTPException(status_code=500, detail="Database not configured")
    response = db.table("disputes").select("*, payments(*), investigations(*, evidence(*))").eq("id", dispute_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Dispute not found")
    return response.data[0]
