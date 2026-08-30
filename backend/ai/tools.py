from typing import Dict, Any, List
from ..database import db

def get_payment(payment_id: str) -> Dict[str, Any]:
    if not db: return {}
    resp = db.table("payments").select("*").eq("id", payment_id).execute()
    return resp.data[0] if resp.data else {}

def get_order_by_payment(payment_id: str) -> Dict[str, Any]:
    if not db: return {}
    resp = db.table("orders").select("*").eq("payment_id", payment_id).execute()
    return resp.data[0] if resp.data else {}

def get_shipping(order_id: str) -> Dict[str, Any]:
    if not db: return {}
    resp = db.table("shipping_records").select("*").eq("order_id", order_id).execute()
    return resp.data[0] if resp.data else {}

def get_customer_messages(order_id: str) -> List[Dict[str, Any]]:
    if not db: return []
    resp = db.table("customer_messages").select("*").eq("order_id", order_id).execute()
    return resp.data

def get_refund_history(order_id: str) -> List[Dict[str, Any]]:
    """Mock for checking if refunds were already issued."""
    # We didn't explicitly make a refund table in our schema to keep it simple,
    # but we can check order status.
    if not db: return []
    resp = db.table("orders").select("*").eq("order_id", order_id).execute()
    if resp.data and resp.data[0].get("status") == "refunded":
        return [{"order_id": order_id, "status": "refunded", "amount": resp.data[0].get("amount")}]
    return []

# We can expose these to Gemini via the Function Calling API.
