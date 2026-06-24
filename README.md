# LinkedIn Writing Assistant

A personal writing tool that transforms raw notes into LinkedIn posts in your voice. Paste bullet points or a rough narrative, get a post back, refine iteratively until it's right.

Built with Next.js, FastAPI, and the Claude API.

---

## How it works

1. Paste your raw notes into the left panel — bullet points, a rough narrative, a few sentences of context
2. Add an optional angle or focus hint (e.g. "lean into the skepticism")
3. Hit Generate — a post appears in the right panel
4. Edit directly or use the Refine bar to give follow-up instructions
5. Copy and post

The style system prompt is engineered to avoid the typical LinkedIn tropes: no clickbait openers, no hook questions, no forced CTAs. Posts start with the specific situation or observation, maintain intellectual honesty, and end naturally.

---

## Setup

### Prerequisites
- Python 3.9+
- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com)

### Backend

```bash
cd backend
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env
```

### Frontend

```bash
cd frontend
npm install
```

---

## Running locally

**Option 1 — single script:**
```bash
./start.sh
```

**Option 2 — two terminals:**

Terminal 1:
```bash
cd backend && .venv/bin/python main.py
```

Terminal 2:
```bash
cd frontend && npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project structure

```
├── backend/
│   ├── main.py           # FastAPI app — /generate and /refine endpoints
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── app/
│   │   ├── page.tsx      # Main UI — two-panel layout
│   │   └── layout.tsx
│   └── package.json
└── start.sh              # Starts both servers
```

---

## API

**POST /generate**
```json
{ "notes": "your raw notes", "angle": "optional focus hint" }
```

**POST /refine**
```json
{ "post": "current post", "instruction": "what to change", "notes": "original notes (optional)" }
```
