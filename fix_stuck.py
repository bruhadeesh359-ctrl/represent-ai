import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if url and key:
    supabase: Client = create_client(url, key)
    res = supabase.table("investigations").update({"status": "FAILED"}).eq("status", "IN_PROGRESS").execute()
    print(f"Reset {len(res.data)} stuck investigations to FAILED.")
else:
    print("Could not find Supabase credentials. Make sure .env is present.")
