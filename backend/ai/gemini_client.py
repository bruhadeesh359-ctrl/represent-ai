import os
import google.generativeai as genai
from pydantic import BaseModel, Field
from typing import List, Optional

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-3.6-flash")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

# Define structured output schema for the model
class EvidenceClaim(BaseModel):
    evidence_id: str = Field(description="A unique ID you invent for this piece of evidence (e.g. EV-001). We will use this to map claims.")
    source: str = Field(description="The source of the evidence, e.g. 'Order DB', 'Shipping API', 'CRM'")
    evidence_type: str = Field(description="What kind of evidence it is (e.g., 'delivery_confirmation', 'customer_message')")
    claim: str = Field(description="The factual claim based purely on the evidence.")
    value: str = Field(description="The exact value from the data (e.g. 'delivered' or 'Customer signed').")

class AIInvestigationResult(BaseModel):
    decision: str = Field(description="Must be FIGHT, ACCEPT, or HUMAN_REVIEW")
    confidence: float = Field(description="Confidence score between 0.0 and 1.0")
    summary: str = Field(description="A brief summary of the reasoning.")
    supporting_evidence: List[EvidenceClaim] = Field(description="Evidence supporting the decision")
    contradicting_evidence: List[EvidenceClaim] = Field(description="Evidence contradicting the decision")
    missing_evidence: List[str] = Field(description="List of things you looked for but couldn't find")
    recommended_action: str = Field(description="What the merchant should do next")

def analyze_dispute_context(dispute: dict, payment: dict, order: dict, shipping: dict, messages: list) -> Optional[AIInvestigationResult]:
    """
    Given all the gathered context, ask Gemini to analyze it and return a structured decision.
    """
    if not GEMINI_API_KEY:
        return None
        
    model = genai.GenerativeModel(GEMINI_MODEL)
    
    prompt = f"""
    You are an AI Dispute Investigator for a merchant.
    Analyze the following dispute and the gathered evidence.
    
    DISPUTE:
    {dispute}
    
    PAYMENT:
    {payment}
    
    ORDER:
    {order}
    
    SHIPPING:
    {shipping}
    
    CUSTOMER MESSAGES:
    {messages}
    
    RULES:
    1. Base your decision ONLY on the provided evidence.
    2. If the product was delivered and there is proof (tracking, customer acknowledgment), FIGHT.
    3. If the product was never shipped or lost, and customer claims not received, ACCEPT.
    4. If there is conflicting evidence (e.g., tracking says delivered, but customer adamantly denies receipt or claims fraud without signature), recommend HUMAN_REVIEW.
    5. Do not invent tracking numbers, names, or events.
    6. Ensure every claim maps to an evidence item.
    """
    
    response = model.generate_content(
        prompt,
        generation_config=genai.GenerationConfig(
            response_mime_type="application/json",
            response_schema=AIInvestigationResult,
        ),
    )
    
    try:
        import json
        result_dict = json.loads(response.text)
        return AIInvestigationResult(**result_dict)
    except Exception as e:
        print(f"Error parsing Gemini response: {e}")
        return None
