from typing import Dict, Any, List
from .gemini_client import AIInvestigationResult, EvidenceClaim

def validate_evidence(ai_result: AIInvestigationResult, raw_context: Dict[str, Any]) -> AIInvestigationResult:
    """
    Deterministically validate that every claim made by the AI actually exists in the raw context.
    If a claim is completely unsupported, we mark it as unverified, or we downgrade the decision to HUMAN_REVIEW.
    """
    
    # Very simplified validator for MVP. In reality, we would do fuzzy matching or exact field matching.
    # We will search the stringified raw_context for keywords from the claim.
    context_str = str(raw_context).lower()
    
    unsupported_claims = 0
    
    # Check supporting evidence
    for ev in ai_result.supporting_evidence:
        if ev.value.lower() not in context_str:
            # The exact value the AI claimed is nowhere in the raw data! Hallucination detected.
            unsupported_claims += 1
            # We could mutate a field here to mark it unverified, but for simplicity we just count it.
            # Ideally we'd have a `verified: bool` field on EvidenceClaim, but pydantic schema might need to allow it.
            
    # Check contradicting evidence
    for ev in ai_result.contradicting_evidence:
        if ev.value.lower() not in context_str:
            unsupported_claims += 1
            
    # If the AI hallucinates ANY evidence, we cannot trust its decision. Route to HUMAN_REVIEW.
    if unsupported_claims > 0:
        ai_result.decision = "HUMAN_REVIEW"
        ai_result.confidence = 0.0
        ai_result.summary = f"VALIDATION FAILED: Detected {unsupported_claims} unsupported claims. Escalating to human review."
        ai_result.recommended_action = "Manual verification required due to hallucinated evidence."
        
    return ai_result
