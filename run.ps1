# run.ps1
# Simple startup script for RepresentAI

Write-Host "Starting RepresentAI MVP..." -ForegroundColor Cyan

# Start Backend
Start-Process powershell -ArgumentList "-NoExit -Command `"cd backend; if (!(Test-Path venv)) { Write-Host 'Run python -m venv venv first' }; .\venv\Scripts\Activate.ps1; uvicorn main:app --reload --port 8000`"" -WindowStyle Normal

# Start Frontend
Start-Process powershell -ArgumentList "-NoExit -Command `"cd frontend; npm run dev`"" -WindowStyle Normal

Write-Host "Both servers are starting in new windows." -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000"
Write-Host "Backend API: http://localhost:8000/docs"
