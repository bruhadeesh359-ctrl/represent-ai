from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List
from database import db

router = APIRouter()

@router.get("")
def get_benchmarks() -> Dict[str, Any]:
    """Get benchmark metrics based on actual synthetic data."""
    if not db:
        raise HTTPException(status_code=500, detail="Database not configured")
    
    # Fetch investigations with ground truth
    investigations_resp = db.table("investigations").select("*").execute()
    investigations = [inv for inv in investigations_resp.data if inv.get("ground_truth_decision") is not None]
    
    total_cases = len(investigations)
    if total_cases == 0:
        return {
            "metrics": {
                "total_cases": 0,
                "accuracy": 0,
                "evidence_grounding": 0,
                "hallucinations": 0,
                "review_rate": 0
            },
            "confusion_matrix": []
        }
        
    correct = 0
    human_reviews = 0
    matrix = {
        "FIGHT": {"FIGHT": 0, "ACCEPT": 0, "HUMAN_REVIEW": 0},
        "ACCEPT": {"FIGHT": 0, "ACCEPT": 0, "HUMAN_REVIEW": 0},
        "HUMAN_REVIEW": {"FIGHT": 0, "ACCEPT": 0, "HUMAN_REVIEW": 0}
    }
    
    # Ensure all investigations have valid strings for matrix
    valid_decisions = ["FIGHT", "ACCEPT", "HUMAN_REVIEW"]
    
    for inv in investigations:
        actual = inv.get("ground_truth_decision")
        predicted = inv.get("decision")
        
        # normalize to valid decisions
        if actual not in valid_decisions: actual = "HUMAN_REVIEW"
        if predicted not in valid_decisions: predicted = "HUMAN_REVIEW"
        
        if actual == predicted:
            correct += 1
        
        if predicted == "HUMAN_REVIEW":
            human_reviews += 1
            
        matrix[actual][predicted] += 1
        
    # Calculate Evidence Grounding
    evidence_resp = db.table("evidence").select("*").execute()
    evidence = evidence_resp.data
    
    total_evidence = len(evidence)
    verified_evidence = sum(1 for e in evidence if e.get("verified") is True)
    hallucinations = total_evidence - verified_evidence
    
    evidence_grounding = round((verified_evidence / total_evidence * 100) if total_evidence > 0 else 0)
    accuracy = round((correct / total_cases) * 100)
    review_rate = round((human_reviews / total_cases) * 100)
    
    return {
        "metrics": {
            "total_cases": total_cases,
            "accuracy": accuracy,
            "evidence_grounding": evidence_grounding,
            "hallucinations": hallucinations,
            "review_rate": review_rate
        },
        "confusion_matrix": [
            {
                "actual": "FIGHT",
                "predicted_fight": matrix["FIGHT"]["FIGHT"],
                "predicted_accept": matrix["FIGHT"]["ACCEPT"],
                "predicted_review": matrix["FIGHT"]["HUMAN_REVIEW"]
            },
            {
                "actual": "ACCEPT",
                "predicted_fight": matrix["ACCEPT"]["FIGHT"],
                "predicted_accept": matrix["ACCEPT"]["ACCEPT"],
                "predicted_review": matrix["ACCEPT"]["HUMAN_REVIEW"]
            },
            {
                "actual": "HUMAN_REVIEW",
                "predicted_fight": matrix["HUMAN_REVIEW"]["FIGHT"],
                "predicted_accept": matrix["HUMAN_REVIEW"]["ACCEPT"],
                "predicted_review": matrix["HUMAN_REVIEW"]["HUMAN_REVIEW"]
            }
        ]
    }
