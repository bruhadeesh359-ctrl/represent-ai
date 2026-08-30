# Razorpay API Audit

## 1. Verified APIs

Based on Razorpay's official API documentation, the following endpoints are available and relevant for RepresentAI:

### Disputes API (`/v1/disputes`)
- **Fetch All Disputes:** `GET /v1/disputes`
- **Fetch a Specific Dispute:** `GET /v1/disputes/{dispute_id}`
- **Accept a Dispute:** `POST /v1/disputes/{dispute_id}/accept`
- **Contest a Dispute:** `POST /v1/disputes/{dispute_id}/contest` (Requires `evidence` payload)

### Documents API (`/v1/documents`)
- **Upload Document:** `POST /v1/documents` (multipart/form-data)
- **Fetch Document:** `GET /v1/documents/{document_id}`

### Webhooks
- `dispute.created`: Fired when a new dispute is initiated.
- `dispute.won`: Fired when a contested dispute is won.
- `dispute.lost`: Fired when a contested dispute is lost.
- `dispute.closed`: Fired when a dispute is closed (e.g., accepted).

## 2. Unsupported APIs / Limitations

- **Test Mode Limitations for Disputes:** Razorpay's test mode generally does not natively generate simulated disputes on demand through the merchant dashboard. While you can sometimes use specific test cards to trigger chargebacks, an on-demand "create dispute" endpoint does not exist for merchants.
- **Consequence:** We must build a **Mock/Simulation Layer** for the demo to deterministically generate disputes for testing. 

## 3. Payloads & Assumptions

### Dispute Object (Standard fields expected)
```json
{
  "id": "disp_...",
  "entity": "dispute",
  "payment_id": "pay_...",
  "amount": 48500,
  "currency": "INR",
  "status": "open",
  "phase": "chargeback",
  "reason_code": "product_not_received",
  "reason_description": "Customer claims product was not received",
  "respond_by": 1693440000
}
```

### Contesting a Dispute Payload
```json
{
  "amount": 48500,
  "summary": "The order was delivered successfully on [Date]. Please find attached evidence.",
  "evidence": {
    "proof_of_delivery": ["doc_..."],
    "shipping_confirmation": ["doc_..."]
  }
}
```

## 4. Integration Strategy

1. **Production-Ready Layer:** We will implement the actual Razorpay client (using `razorpay` Python SDK) for `/v1/disputes` and `/v1/documents`.
2. **Demo Simulation Layer:** We will expose an API `POST /api/demo/simulate-dispute` in our FastAPI backend to inject synthetic disputes directly into our database and trigger the local webhook logic, bypassing the Razorpay test mode limitations.
