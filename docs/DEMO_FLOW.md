# Demo Flow

This document outlines the ideal 5-minute demo path for RepresentAI at the Razorpay AI Buildathon.

## 0:00 - The Intake (Dashboard)
- **Action:** Open the dashboard. A new simulated dispute appears.
- **Narrative:** "A merchant receives a dispute webhook from Razorpay. Instead of logging into 5 different systems, the dispute appears here."
- **Visuals:** A card showing `🔴 NEW DISPUTE`, `₹48,500`, `Product not received`.

## 0:30 - The Investigation (Trigger)
- **Action:** The merchant clicks the **[ 🔍 INVESTIGATE ]** button.
- **Narrative:** "The merchant triggers the AI agent. The agent begins gathering evidence from shipping, order DBs, and CRM."

## 1:00 - Live Evidence Collection
- **Action:** UI shows real-time progress.
- **Visuals:** Checklist ticking off ("Order found", "Shipping checked", "Delivery evidence found"). Progress bar filling based on backend events.

## 1:45 - The Evidence Graph
- **Action:** Show the visual node graph of the collected evidence linking the Dispute to Order, Payment, Shipping, and CRM.
- **Narrative:** "Here is the unified view of everything related to this dispute."

## 2:15 - AI Decision & Explanation
- **Action:** The AI recommendation appears: `🟢 FIGHT`.
- **Narrative:** "RepresentAI evaluated the evidence and recommends a FIGHT response with 96% confidence because the tracking API confirms delivery."
- **Visuals:** Clearly highlight the supporting evidence.

## 3:15 - PDF Generation & Human Approval
- **Action:** Click **[ GENERATE RESPONSE ]**.
- **Narrative:** "The AI drafts the response structure, and our backend generates a professional, Razorpay-ready PDF. Every factual claim is validated against our Evidence DB—no hallucinations."
- **Visuals:** Show the generated PDF with mapped evidence.
- **Action:** Merchant clicks **[ APPROVE & CONTINUE ]**, submitting the document to Razorpay (or simulation).

## 4:00 - Case 2 (Accept) / Case 3 (Human Review)
- **Action:** Use the **▶ RUN DEMO** button to quickly run through a "Never Shipped" scenario resulting in a `🔴 ACCEPT` recommendation. Show an adversarial scenario (e.g., Shipping says "Delivered", but CRM has a message saying "Never received") resulting in `🟡 HUMAN REVIEW`.
- **Narrative:** "The AI understands nuance and contradictions."

## 4:30 - Benchmark Run
- **Action:** Open the Benchmark page.
- **Narrative:** "We ran 50 synthetic test cases. Our AI achieves high accuracy without generating unsupported claims. We prioritize correct routing over forced automation."
- **Visuals:** Show actual benchmark metrics calculated dynamically from the database.
