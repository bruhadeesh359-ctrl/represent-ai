from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="RepresentAI API", description="Backend for Razorpay AI Buildathon")

# Allow CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For hackathon, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "RepresentAI API is running."}

from routers import mock_apis, webhooks, documents, disputes
from workflows import investigation

app.include_router(mock_apis.router, prefix="/mock", tags=["mock"])
app.include_router(webhooks.router, prefix="/webhooks", tags=["webhooks"])
app.include_router(disputes.router, prefix="/api/disputes", tags=["disputes"])
app.include_router(investigation.router, prefix="/api/investigations", tags=["investigations"])
app.include_router(documents.router, prefix="/api/documents", tags=["documents"])




