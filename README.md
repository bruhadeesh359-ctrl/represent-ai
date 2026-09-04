# Represent AI 🛡️

**Represent AI** is an intelligent, automated dispute resolution platform built for the **Razorpay AI Buildathon**. It empowers merchants to handle chargebacks and disputes efficiently by automatically gathering context, analyzing evidence, and generating actionable recommendations.

## What it does

When a dispute is filed against a merchant on Razorpay, Represent AI automatically:
1. **Listens to Webhooks:** Captures the dispute event in real-time.
2. **Gathers Context:** Pulls relevant data across orders, payments, shipping, and customer communications.
3. **AI Investigation:** Uses Google Gemini (e.g., `gemini-3.5-flash`) to analyze the dispute context against predefined rules.
4. **Actionable Recommendations:** Outputs a structured decision (`FIGHT`, `ACCEPT`, or `HUMAN_REVIEW`) along with a confidence score and supporting evidence.
5. **Dashboard Visualization:** Displays real-time financial exposure and operational queues on a sleek, modern Command Center.

## Tech Stack

- **Frontend:** Next.js (React), Tailwind CSS
- **Backend:** FastAPI (Python)
- **Database:** Supabase (PostgreSQL)
- **AI Engine:** Google Gemini (`google-generativeai`)
- **Hosting:** Vercel (Frontend), Render (Backend)

## Core Features

- **Automated Evidence Collection:** Reduces manual lookup time by aggregating context into a single view.
- **Deterministic AI Workflows:** Uses structured generation to ensure the AI's response strictly follows the `AIInvestigationResult` schema.
- **Financial Exposure Tracking:** Visualizes at-risk funds segmented by the AI's predicted outcome.
- **Razorpay Integration:** Seamlessly handles Razorpay Webhook events for disputes.

## Setup Instructions

1. **Clone the repository.**
2. **Backend Setup:**
   - Navigate to `/backend`.
   - Create a virtual environment: `python -m venv venv`
   - Install dependencies: `pip install -r requirements.txt`
   - Set up `.env` using `.env.example`. Make sure to provide your `GEMINI_API_KEY` and Supabase keys.
   - Run the server: `python -m uvicorn main:app --reload`
3. **Frontend Setup:**
   - Navigate to `/frontend`.
   - Install dependencies: `npm install`
   - Set up `.env.local` for Next.js.
   - Run the development server: `npm run dev`

---
*Built with ❤️ for the Razorpay AI Buildathon.*
