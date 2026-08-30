import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_SERVICE_ROLE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")

def get_supabase() -> Client:
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        raise ValueError("Supabase credentials not found in environment variables.")
    return create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

# A global instance we can import in other modules
try:
    db = get_supabase()
except ValueError as e:
    db = None
    print(f"Warning: {e}")
