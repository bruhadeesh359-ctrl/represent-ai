from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from database import db

router = APIRouter()

@router.get("/orders/{order_id}")
def mock_get_order(order_id: str) -> Dict[str, Any]:
    """Mock API for merchant's internal order DB."""
    if not db:
        raise HTTPException(status_code=500, detail="Database not configured")
    response = db.table("orders").select("*").eq("order_id", order_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Order not found")
    return response.data[0]

@router.get("/shipping/{order_id}")
def mock_get_shipping(order_id: str) -> Dict[str, Any]:
    """Mock API for external shipping provider."""
    if not db:
        raise HTTPException(status_code=500, detail="Database not configured")
    response = db.table("shipping_records").select("*").eq("order_id", order_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Shipping record not found")
    return response.data[0]

@router.get("/customers/{customer_id}/messages")
def mock_get_customer_messages(customer_id: str) -> Dict[str, Any]:
    """Mock API for CRM/Customer Support."""
    if not db:
        raise HTTPException(status_code=500, detail="Database not configured")
    response = db.table("customer_messages").select("*").eq("customer_id", customer_id).execute()
    return {"messages": response.data}
