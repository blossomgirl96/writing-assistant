"use client";

import { useState, useRef, useEffect } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const STORAGE_KEY = "linkedin-assistant-session";

type Message = {
  id: string;
  type: "user" | "ai";
  content: string;
  label: string;
  timestamp: number;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
    } catch {
      // ignore parse errors
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages, hydrated]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const pushMessage = (msg: Omit<Message, "id" | "timestamp">) => {
    const full: Message = { ...msg, id: crypto.randomUUID(), timestamp: Date.now() };
    setMessages((prev) => [...prev, full]);
    return full;
  };

  const submit = async () => {
    if (!input.trim() || isLoading) return;
    setError("");

    const trimmedInput = input.trim();
    const snap = messages;
    const aiSnap = snap.filter((m) => m.type === "ai");
    const isFirst = aiSnap.length === 0;
    const nextVersion = aiSnap.length + 1;

    pushMessage({
      type: "user",
      content: trimmedInput,
      label: isFirst ? "Your notes" : "Refinement",
    });

    setInput("");
    setIsLoading(true);

    try {
      let post: string;

      if (isFirst) {
        const res = await fetch(`${API_BASE}/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ notes: trimmedInput, angle: "" }),
        });
        if (!res.ok) throw new Error(await res.text());
        ({ post } = await res.json());
      } else {
        const lastAi = [...snap].reverse().find((m) => m.type === "ai");
        const firstUser = snap.find((m) => m.type === "user");
        const res = await fetch(`${API_BASE}/refine`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            post: lastAi?.content ?? "",
            instruction: trimmedInput,
            notes: firstUser?.content ?? "",
          }),
        });
        if (!res.ok) throw new Error(await res.text());
        ({ post } = await res.json());
      }

      pushMessage({ type: "ai", content: post, label: `Post v${nextVersion}` });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  };

  const copy = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const newPost = () => {
    setMessages([]);
    setInput("");
    setError("");
    setTimeout(() => inputRef.current?.focus(), 80);
  };

  const hasPost = messages.some((m) => m.type === "ai");

  if (!hydrated) return null;

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
        {messages.length > 0 && (
          <button
            onClick={newPost}
            className="text-xs text-stone-500 hover:text-stone-800 border border-stone-200 rounded-md px-3 py-1.5 transition-colors bg-white cursor-pointer"
          >
            New post
          </button>
        )}
      </header>

      {/* Chat history */}
      <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6">
        {messages.length === 0 && !isLoading && (
          <div className="flex-1 flex items-center justify-center min-h-[200px]">
            <p className="text-sm text-stone-300 text-center max-w-xs leading-relaxed">
              Paste your notes below.<br />
              Each version stays visible — nothing gets lost.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-stone-400 uppercase tracking-wider shrink-0">
                {msg.label}
              </span>
              <div className="flex-1 h-px bg-stone-100" />
              {msg.type === "ai" && (
                <span
                  className={`text-xs tabular-nums shrink-0 ${
                    msg.content.length > 3000 ? "text-red-400" : "text-stone-300"
                  }`}
                >
                  {msg.content.length.toLocaleString()} / 3,000
                </span>
              )}
            </div>

            <div
              className={`rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.type === "user"
                  ? "bg-stone-100 text-stone-600"
                  : "bg-white border border-stone-200 text-stone-900"
              }`}
            >
              {msg.content}
            </div>

            {msg.type === "ai" && (
              <div className="flex justify-end">
                <button
                  onClick={() => copy(msg.id, msg.content)}
                  className="text-xs text-stone-400 hover:text-stone-700 border border-stone-200 rounded-md px-2.5 py-1 transition-colors bg-white cursor-pointer"
                >
                  {copiedId === msg.id ? "Copied ✓" : "Copy"}
                </button>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-stone-400 uppercase tracking-wider shrink-0">
                {hasPost
                  ? `Post v${messages.filter((m) => m.type === "ai").length + 1}`
                  : "Post v1"}
              </span>
              <div className="flex-1 h-px bg-stone-100" />
            </div>
            <div className="bg-white border border-stone-200 rounded-xl px-4 py-3 flex items-center gap-2 text-sm text-stone-400">
              <Spinner />
              {hasPost ? "Refining…" : "Generating…"}
            </div>
          </div>
        )}

        {error && <p className="text-xs text-red-500 px-1">{error}</p>}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-stone-200 px-8 pt-4 pb-6 shrink-0 bg-white flex flex-col gap-3">
        <div className="flex gap-3 items-end">
          <textarea
            ref={inputRef}
            rows={3}
            className="flex-1 text-sm text-stone-800 placeholder:text-stone-300 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-stone-300 bg-stone-50 resize-none leading-relaxed"
            placeholder={
              hasPost
                ? "Refine: e.g. 'make the opener less structured' or 'cut the last paragraph'"
                : "Paste your notes — bullet points, rough narrative, a few sentences of context"
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                submit();
              }
            }}
          />
          <button
            onClick={submit}
            disabled={!input.trim() || isLoading}
            className="bg-stone-900 hover:bg-stone-700 disabled:bg-stone-200 disabled:text-stone-400 text-white text-sm font-medium rounded-xl px-5 py-3 transition-colors cursor-pointer disabled:cursor-not-allowed whitespace-nowrap self-end"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Spinner />
                {hasPost ? "Refining…" : "Generating…"}
              </span>
            ) : hasPost ? (
              "Refine ⌘↵"
            ) : (
              "Generate ⌘↵"
            )}
          </button>
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
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
