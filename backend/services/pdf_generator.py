import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from typing import Dict, Any, List

def generate_dispute_response_pdf(investigation: Dict[str, Any], evidence_claims: List[Dict[str, Any]], dispute: Dict[str, Any], output_path: str):
    """
    Generate a professional PDF response for the dispute.
    """
    doc = SimpleDocTemplate(output_path, pagesize=letter,
                            rightMargin=72, leftMargin=72,
                            topMargin=72, bottomMargin=18)
    
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name='Center', alignment=1))
    
    Story = []
    
    # Header
    title = Paragraph("<b>RepresentAI Dispute Response Package</b>", styles['Heading1'])
    Story.append(title)
    Story.append(Spacer(1, 12))
    
    # Dispute Information
    Story.append(Paragraph(f"<b>Dispute ID:</b> {dispute.get('razorpay_dispute_id')}", styles['Normal']))
    Story.append(Paragraph(f"<b>Reason Code:</b> {dispute.get('reason_code')}", styles['Normal']))
    Story.append(Paragraph(f"<b>Amount:</b> {dispute.get('amount') / 100} {dispute.get('currency')}", styles['Normal']))
    Story.append(Paragraph(f"<b>AI Recommendation:</b> {investigation.get('decision')}", styles['Heading3']))
    Story.append(Spacer(1, 12))
    
    # Summary
    Story.append(Paragraph("<b>Executive Summary</b>", styles['Heading2']))
    Story.append(Paragraph(investigation.get('reasoning_summary', ''), styles['Normal']))
    Story.append(Spacer(1, 12))
    
    # Evidence Table
    Story.append(Paragraph("<b>Validated Evidence Map</b>", styles['Heading2']))
    Story.append(Spacer(1, 6))
    
    data = [["Evidence ID", "Source", "Claim", "Value"]]
    for ev in evidence_claims:
        data.append([
            ev.get("id"),
            ev.get("source"),
            ev.get("claim"),
            ev.get("value")
        ])
        
    # Table styling
    t = Table(data, colWidths=[70, 80, 180, 130])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0,0), (-1,-1), 1, colors.black),
        ('VALIGN',(0,0),(-1,-1),'TOP'),
        ('WORDWRAP',(0,0),(-1,-1), True)
    ]))
    
    Story.append(t)
    Story.append(Spacer(1, 24))
    
    Story.append(Paragraph("<i>This document was auto-generated and verified by RepresentAI.</i>", styles['Center']))
    
    doc.build(Story)
    return output_path
