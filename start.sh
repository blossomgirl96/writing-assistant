#!/bin/bash

# Start both backend and frontend in split terminals
# Usage: ./start.sh

ROOT="$(cd "$(dirname "$0")" && pwd)"

# Backend
echo "Starting FastAPI backend on :8000..."
cd "$ROOT/backend"
if [ ! -d ".venv" ]; then
  echo "Creating virtual environment..."
  python3 -m venv .venv
  .venv/bin/pip install -r requirements.txt -q
fi
.venv/bin/python main.py &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

# Frontend
echo "Starting Next.js frontend on :3000..."
cd "$ROOT/frontend"
npm run dev &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

echo ""
echo "App running at http://localhost:3000"
echo "Press Ctrl+C to stop both servers."

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM
wait
