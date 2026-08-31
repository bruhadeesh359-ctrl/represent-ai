from database import db
evidence = db.table("evidence").select("*").execute()
print(f"Total Evidence: {len(evidence.data)}")
if len(evidence.data) > 0:
    print(f"Sample Evidence Keys: {list(evidence.data[0].keys())}")
    print(f"Unique verification_statuses: {set(e['verification_status'] for e in evidence.data)}")
