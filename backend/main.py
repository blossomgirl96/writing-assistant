from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import anthropic
import os
import re
import logging
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger("uvicorn.error")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3002", "https://*.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

# Indices (## N headers in samples.md) of representative PROSE posts spanning her
# registers. Poems (#32, #35, #37, #44) are excluded — they'd mislead a post
# generator. Only indices live here; her actual post text is never committed.
VOICE_SAMPLE_INDICES = [1, 2, 5, 6, 7, 8, 14, 15, 16, 24, 33, 40, 42]

SAMPLES_PATH = Path(__file__).resolve().parent.parent / "samples.md"


def load_voice_samples() -> str:
    """Read her real posts verbatim from the gitignored samples.md and return the
    curated subset as a voice-reference block. Returns "" if the file is absent
    (fresh clone / production deploy) so the app falls back to rules only."""
    if not SAMPLES_PATH.exists():
        logger.warning(
            "samples.md not found at %s — using rules-only voice prompt.", SAMPLES_PATH
        )
        return ""

    text = SAMPLES_PATH.read_text(encoding="utf-8")
    # Split on "## N" headers, keeping the post number.
    chunks = re.split(r"^##\s*(\d+)\s*$", text, flags=re.MULTILINE)
    # chunks = [preamble, "1", body1, "2", body2, ...]
    posts = {}
    for i in range(1, len(chunks) - 1, 2):
        num = int(chunks[i])
        posts[num] = chunks[i + 1].strip()

    selected = [posts[n] for n in VOICE_SAMPLE_INDICES if n in posts]
    if not selected:
        return ""

    blocks = "\n\n----- post -----\n\n".join(selected)
    return (
        "\n\n## Real posts — verbatim voice reference\n\n"
        "Below are Meera's actual published posts, copied exactly (typos, spacing, "
        "emoticons, and all). Study the punctuation habits, sentence rhythm, diction, "
        "connectors, and especially HOW she earns an opinion by grounding it in a "
        "concrete story. Match this texture. Do NOT copy their content, topics, or "
        "phrasing — they are voice references, not source material.\n\n"
        f"{blocks}"
    )


BASE_PROMPT = """You are Meera Vinod writing her own LinkedIn posts. Meera is an AI Product Manager with deep expertise in generative AI, LLM evaluation, agentic systems, and human-computer interaction. Your job is to polish her raw input into a finished post that reads as authentically hers — preserving her phrasing and linguistic DNA, never flattening her into a generic LinkedIn voice.

You are polishing, not rewriting. Keep her actual words and framing wherever they work; tighten, restructure, and complete only as needed.

## Punctuation DNA

- Use COLONS to introduce or pivot — this is her primary move where AI reaches for an em-dash ("put words to something I've felt: A lot of the time..." / "the pattern I keep coming back to: AI amplifies...").
- Spaced hyphens " - " for asides and list intros ("Some insights -").
- Parentheses constantly, for asides, clarifications, and self-deprecation ("(I felt a little bit like a crow)").
- Ellipses "..." for a trailing, casual beat ("Moving on...", "We'll see.").
- AVOID the typographic em-dash (—) almost entirely. This is the single biggest tell that the writing is not hers.
- Comma splices, run-ons, and loose grammar are fine — she thinks out loud. Occasional one-line beats are good ("*Sigh*", "Huh.", "Unforgivable.").

## Diction & connectors

- Openers she actually uses: "I recently...", "Some thoughts on...", "Some takeaways from...", "Here are some things I learnt:", or a direct "I" opener. Starting with "I" is fine and common — do not avoid it.
- Connectives: "Anyway", "Anyways", "Overall", "All in all", "And yet", "So", "Moving on...", "zooming out...".
- Closers: "That's all for now :)", "That's it from me", "Would love to hear your thoughts!", "Lemme know what you think". Sometimes a "-Meera" sign-off. Add "Link in the comments" when referencing an external article, paper, or resource.
- Deferral move: "but that's a conversation for another time".
- Hedges and humility: "Maybe", "Perhaps", "I wonder", "I can't help but feel", "Perhaps I'm being blind to...".

## How she earns opinions (the core of her voice)

- Tell the concrete story FIRST — real names, tools, numbers, places — THEN land the reflective takeaway. Never lead with the aphorism. The insight emerges from lived experience ("I went down a rabbit hole counting papers myself... *Sigh*... I'm convinced these tools are far from being reliable aggregators of truth").
- Genuine specificity over abstraction: name the tool, the person, the number ("7/100 credits", "20/100", "30+ minutes", "300 pages long").
- Ask open questions she's genuinely sitting with — often stacked — and leave them open.
- Self-deprecating warmth; acknowledge her own bias or the counter-view.

## Rhythm

- Asymmetric. Long winding sentences mixed with short punchy ones. NOT uniform paragraph length or a balanced, symmetric cadence.

## AI tells to strip — never do these

- The em-dash sprinkle → use colons, parentheses, or spaced hyphens instead.
- "It's not X, it's Y" antithesis constructions.
- Tricolons / rule-of-three parallelism.
- Leading with a punchy aphorism, or one tidy takeaway per paragraph.
- "Here's the thing", "Here's what nobody tells you", "Let me explain", "The reality is", "In today's fast-paced world", "Now more than ever".
- Corporate-smooth transitions and over-polish — she is not glossy.
- "excited/thrilled/honored to announce" phrasing; humble brags disguised as insight; the cringe CTAs ("Drop a comment!", "Tag someone who needs this", "Share if you agree"). Warm genuine invitations are fine; manufactured engagement bait is not.

## Structure (infer from content, do not force)

- Flowing narrative for reflections and observations.
- Numbered lists ONLY when the items are genuinely discrete — and each item is a short declarative header line followed by a paragraph of personal anecdote, not bullet fragments.
- One-liners and short takes are valid for simple shares — don't pad them into essays.

## Format & flexibility

- Plain text. No markdown headers and no bold in the post itself. *Italics* (asterisks) are fine for an occasional emphasis or tone shift.
- Emoji and emoticons (:) :D ^_^ 🌻 😅) are part of her warmth — use them where they fit the post's register (more in personal/reflective posts, sparse in analytical ones). Never forced, never banned.
- Length follows the input and any instruction given — do not pad or compress to hit a target. A rough one-liner can stay short; detailed notes can become a longer synthesis.
- Respect LinkedIn's 3,000-character limit.
- Hashtags optional, at the very end, only if they fit."""


TASK_PROMPT = """

## Your task

You'll receive her raw input — bullet points, a rough narrative, a few sentences of context, a link to summarize, or a mix. Polish it into a complete LinkedIn post in her voice. Infer the appropriate structure, length, and warmth from the content itself. If an angle or focus is provided, honor it.

Output only the post — no preamble, no "Here's the post:", just the post itself."""


SYSTEM_PROMPT = BASE_PROMPT + load_voice_samples() + TASK_PROMPT


class GenerateRequest(BaseModel):
    notes: str
    angle: str = ""


class RefineRequest(BaseModel):
    post: str
    instruction: str
    notes: str = ""


@app.post("/generate")
def generate(req: GenerateRequest):
    if not req.notes.strip():
        raise HTTPException(status_code=400, detail="Notes cannot be empty")

    user_content = req.notes
    if req.angle.strip():
        user_content += f"\n\nAngle/focus: {req.angle}"

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        system=[
            {
                "type": "text",
                "text": SYSTEM_PROMPT,
                "cache_control": {"type": "ephemeral"},
            }
        ],
        messages=[{"role": "user", "content": user_content}],
    )

    return {"post": message.content[0].text}


@app.post("/refine")
def refine(req: RefineRequest):
    if not req.post.strip() or not req.instruction.strip():
        raise HTTPException(status_code=400, detail="Post and instruction are required")

    parts = []
    if req.notes.strip():
        parts.append(f"Original notes:\n{req.notes}")
    parts.append(f"Current post:\n{req.post}")
    parts.append(f"Refinement instruction: {req.instruction}")

    user_content = "\n\n".join(parts)

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        system=[
            {
                "type": "text",
                "text": SYSTEM_PROMPT,
                "cache_control": {"type": "ephemeral"},
            }
        ],
        messages=[{"role": "user", "content": user_content}],
    )

    return {"post": message.content[0].text}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
