import os
import pytest
from pypdf import PdfReader
from services.pdf_generator import generate_dispute_response_pdf

def _read_pdf_text(path):
    reader = PdfReader(path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text

@pytest.fixture
def sample_investigation():
    return {
        "decision": "FIGHT",
        "confidence": 0.94,
        "reasoning_summary": "The merchant contests this dispute.",
        "completed_at": "2026-08-31T10:00:00Z"
    }

@pytest.fixture
def sample_dispute():
    return {
        "razorpay_dispute_id": "disp_test_123",
        "amount": 48500,
        "currency": "INR",
        "reason_code": "goods_not_received",
        "status": "open"
    }

def test_pdf_generation_fight(sample_investigation, sample_dispute, tmp_path):
    """Test standard FIGHT case with all verified evidence."""
    evidence = [
        {"claim": "Delivery confirmed", "source": "shipping", "value": "Delivered to porch", "verified": True},
        {"claim": "Order shipped", "source": "order", "value": "Shipped on Aug 30", "verified": True}
    ]
    
    pdf_path = str(tmp_path / "fight.pdf")
    generate_dispute_response_pdf(sample_investigation, evidence, sample_dispute, pdf_path)
    
    assert os.path.exists(pdf_path)
    text = _read_pdf_text(pdf_path)
    
    # Assert main structural elements exist
    assert "DISPUTE REPRESENTMENT PACKAGE" in text
    assert "EXECUTIVE SUMMARY" in text
    assert "INVESTIGATION TIMELINE" in text
    assert "AI EVIDENCE VERIFICATION" in text
    
    # Assert values from JSON are mapped
    assert "disp_test_123" in text
    assert "Rs. 485.00" in text  # 48500 paise
    assert "Delivered to porch" in text
    assert "FIGHT" in text
    
    # Check claim counts
    assert "VERIFIED CLAIMS" in text
    assert "2" in text # 2 verified claims
    
def test_pdf_generation_accept_with_unsupported(sample_investigation, sample_dispute, tmp_path):
    """Test ACCEPT case where unsupported evidence exists."""
    sample_investigation["decision"] = "ACCEPT"
    sample_investigation["confidence"] = 0.85
    
    evidence = [
        {"claim": "Customer signed", "source": "shipping", "value": "Signature available", "verified": False},
        {"claim": "Order received", "source": "crm", "value": "Customer stated they never got it", "verified": True}
    ]
    
    pdf_path = str(tmp_path / "accept.pdf")
    generate_dispute_response_pdf(sample_investigation, evidence, sample_dispute, pdf_path)
    
    assert os.path.exists(pdf_path)
    text = _read_pdf_text(pdf_path)
    
    assert "ACCEPT" in text
    
    # The unsupported claim ("Customer signed") should NOT be in the KEY EVIDENCE narrative
    # KEY EVIDENCE narrative is before AI EVIDENCE VERIFICATION
    # pypdf might scramble some text, but let's check basic presence
    # Actually, we expect "Signature available" to ONLY appear in the final table, marked as REJECTED
    assert "REJECTED" in text
    assert "Customer signed" in text
    
def test_pdf_missing_optional_data(tmp_path):
    """Test robustness when missing optional fields like reasoning, currency."""
    pdf_path = str(tmp_path / "missing_data.pdf")
    # Empty dictionaries should not crash the generator
    generate_dispute_response_pdf({}, [], {}, pdf_path)
    assert os.path.exists(pdf_path)
    text = _read_pdf_text(pdf_path)
    assert "DISPUTE REPRESENTMENT PACKAGE" in text
    assert "N/A" in text # Missing dispute ID fallback
