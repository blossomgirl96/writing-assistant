"use client";

import { useState, useRef } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type Status = "idle" | "generating" | "refining" | "copied";

export default function Home() {
  const [notes, setNotes] = useState("");
  const [angle, setAngle] = useState("");
  const [post, setPost] = useState("");
  const [refineInstruction, setRefineInstruction] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const refineRef = useRef<HTMLInputElement>(null);

  const generate = async () => {
    if (!notes.trim()) return;
    setStatus("generating");
    setError("");
    try {
      const res = await fetch(`${API_BASE}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes, angle }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setPost(data.post);
      setTimeout(() => refineRef.current?.focus(), 100);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setStatus("idle");
    }
  };

  const refine = async () => {
    if (!refineInstruction.trim() || !post.trim()) return;
    setStatus("refining");
    setError("");
    try {
      const res = await fetch(`${API_BASE}/refine`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post, instruction: refineInstruction, notes }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setPost(data.post);
      setRefineInstruction("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setStatus("idle");
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(post);
    setStatus("copied");
    setTimeout(() => setStatus("idle"), 1500);
  };

  const isGenerating = status === "generating";
  const isRefining = status === "refining";
  const isCopied = status === "copied";
  const charCount = post.length;
  const overLimit = charCount > 3000;

  return (
    <main className="h-screen flex flex-col bg-stone-50 font-sans">
      {/* Header */}
      <header className="px-8 py-5 border-b border-stone-200 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-base font-semibold text-stone-900 tracking-tight">
            LinkedIn Writing Assistant
          </h1>
          <p className="text-xs text-stone-400 mt-0.5">your voice, less friction</p>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1 grid grid-cols-2 gap-0 overflow-hidden">
        {/* Left: Input */}
        <div className="flex flex-col border-r border-stone-200 overflow-hidden">
          <div className="px-6 pt-5 pb-3 shrink-0">
            <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">
              Your notes
            </label>
          </div>
          <textarea
            className="flex-1 px-6 pb-4 text-sm text-stone-800 placeholder:text-stone-300 resize-none focus:outline-none bg-transparent leading-relaxed"
            placeholder={`Paste anything — rough notes, bullet points, a few sentences.\n\nExamples:\n• Attended X conference, saw talk by Y on Z, key insight was...\n• Read the HBR piece on AI productivity. My take: it misses the expertise angle...\n• Used Lovable to build a site this weekend. Here's what actually happened...`}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") generate();
            }}
          />
          <div className="px-6 pb-6 flex flex-col gap-3 shrink-0 border-t border-stone-100 pt-4">
            <input
              className="text-sm text-stone-700 placeholder:text-stone-300 border border-stone-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-stone-300 bg-white"
              placeholder="Angle / focus (optional) — e.g. 'lean into the skepticism'"
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
            />
            <button
              onClick={generate}
              disabled={!notes.trim() || isGenerating}
              className="w-full bg-stone-900 hover:bg-stone-700 disabled:bg-stone-200 disabled:text-stone-400 text-white text-sm font-medium rounded-lg py-3 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner /> Generating…
                </span>
              ) : (
                "Generate  ⌘↵"
              )}
            </button>
          </div>
        </div>

        {/* Right: Output */}
        <div className="flex flex-col overflow-hidden">
          <div className="px-6 pt-5 pb-3 shrink-0 flex items-center justify-between">
            <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">
              Generated post
            </label>
            {post && (
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs tabular-nums ${overLimit ? "text-red-500" : "text-stone-400"}`}
                >
                  {charCount.toLocaleString()} / 3,000
                </span>
                <button
                  onClick={copy}
                  className="text-xs text-stone-500 hover:text-stone-800 border border-stone-200 rounded-md px-2.5 py-1 transition-colors bg-white cursor-pointer"
                >
                  {isCopied ? "Copied ✓" : "Copy"}
                </button>
              </div>
            )}
          </div>

          <textarea
            className="flex-1 px-6 pb-4 text-sm text-stone-800 placeholder:text-stone-300 resize-none focus:outline-none bg-transparent leading-relaxed"
            placeholder="Your post will appear here. You can edit it directly once generated."
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />

          <div className="px-6 pb-6 flex flex-col gap-2 shrink-0 border-t border-stone-100 pt-4">
            {error && <p className="text-xs text-red-500 pb-1">{error}</p>}
            <div className="flex gap-2">
              <input
                ref={refineRef}
                className="flex-1 text-sm text-stone-700 placeholder:text-stone-300 border border-stone-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-stone-300 bg-white disabled:bg-stone-50 disabled:text-stone-300"
                placeholder={
                  post
                    ? "Refine: e.g. 'make the opener less structured' or 'cut the last paragraph'"
                    : "Generate a post first"
                }
                value={refineInstruction}
                disabled={!post}
                onChange={(e) => setRefineInstruction(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && refineInstruction.trim() && !isRefining)
                    refine();
                }}
              />
              <button
                onClick={refine}
                disabled={!refineInstruction.trim() || !post || isRefining}
                className="bg-stone-100 hover:bg-stone-200 disabled:bg-stone-50 disabled:text-stone-300 text-stone-700 text-sm font-medium rounded-lg px-4 transition-colors whitespace-nowrap cursor-pointer disabled:cursor-not-allowed"
              >
                {isRefining ? <Spinner /> : "Refine ↵"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 inline-block"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
