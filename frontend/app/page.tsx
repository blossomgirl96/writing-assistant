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
    <main className="h-screen flex flex-col" style={{ background: "#FAF8F5", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Header */}
      <header
        className="px-8 py-4 flex items-center justify-between shrink-0 border-b"
        style={{ background: "#FAF8F5", borderColor: "#E5DDD4" }}
      >
        <div>
          <span className="text-sm font-medium" style={{ color: "#1A1714" }}>
            LinkedIn Writing Assistant
          </span>
        </div>
        {messages.length > 0 && (
          <button
            onClick={newPost}
            className="text-xs px-3 py-1.5 rounded cursor-pointer border transition-colors"
            style={{ color: "#6B6459", borderColor: "#D9D0C6", background: "transparent" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#1A1714";
              e.currentTarget.style.borderColor = "#A89E94";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#6B6459";
              e.currentTarget.style.borderColor = "#D9D0C6";
            }}
          >
            New post
          </button>
        )}
      </header>

      {/* Chat history */}
      <div
        className="flex-1 overflow-y-auto py-10 flex flex-col gap-10"
        style={{
          paddingLeft: "max(2rem, calc((100% - 660px) / 2))",
          paddingRight: "max(2rem, calc((100% - 660px) / 2))",
        }}
      >
        {messages.length === 0 && !isLoading && (
          <div className="flex-1 flex flex-col items-center justify-center min-h-[260px]">
            <p className="text-sm text-center" style={{ color: "#B0A89E", lineHeight: "1.7" }}>
              Paste your rough notes below.
              <br />
              Every version stays visible.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span
                className="text-xs uppercase tracking-widest shrink-0"
                style={{
                  color: msg.type === "ai" ? "#7C6F5E" : "#B0A89E",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                }}
              >
                {msg.label}
              </span>
              <div className="flex-1 h-px" style={{ background: "#E5DDD4" }} />
              {msg.type === "ai" && (
                <span
                  className="text-xs tabular-nums shrink-0"
                  style={{ color: msg.content.length > 3000 ? "#C0392B" : "#C4BAB0" }}
                >
                  {msg.content.length.toLocaleString()} / 3,000
                </span>
              )}
            </div>

            {msg.type === "user" ? (
              <div
                className="text-sm leading-relaxed whitespace-pre-wrap px-4 py-3 rounded"
                style={{ background: "#F0EBE4", color: "#57534E" }}
              >
                {msg.content}
              </div>
            ) : (
              <div
                className="whitespace-pre-wrap px-5 py-5 rounded border"
                style={{
                  background: "#FFFFFF",
                  color: "#1A1714",
                  fontSize: "15px",
                  lineHeight: "1.8",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  borderColor: "#E5DDD4",
                }}
              >
                {msg.content}
              </div>
            )}

            {msg.type === "ai" && (
              <div className="flex justify-end">
                <button
                  onClick={() => copy(msg.id, msg.content)}
                  className="text-xs px-3 py-1.5 rounded cursor-pointer border transition-colors"
                  style={{
                    color: copiedId === msg.id ? "#1A1714" : "#A89E94",
                    borderColor: copiedId === msg.id ? "#A89E94" : "#D9D0C6",
                    background: "transparent",
                  }}
                >
                  {copiedId === msg.id ? "Copied" : "Copy"}
                </button>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span
                className="text-xs uppercase tracking-widest shrink-0"
                style={{ color: "#7C6F5E", letterSpacing: "0.08em", fontWeight: 600 }}
              >
                {hasPost ? `Post v${messages.filter((m) => m.type === "ai").length + 1}` : "Post v1"}
              </span>
              <div className="flex-1 h-px" style={{ background: "#E5DDD4" }} />
            </div>
            <div
              className="px-5 py-5 flex items-center gap-3 text-sm rounded border"
              style={{
                background: "#FFFFFF",
                borderColor: "#E5DDD4",
                color: "#B0A89E",
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              <Spinner />
              <span>{hasPost ? "Refining…" : "Drafting…"}</span>
            </div>
          </div>
        )}

        {error && (
          <p className="text-xs px-1" style={{ color: "#C0392B" }}>
            {error}
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div
        className="shrink-0 border-t"
        style={{ background: "#FAF8F5", borderColor: "#E5DDD4" }}
      >
        <div
          className="py-4 flex gap-3 items-center"
          style={{
            paddingLeft: "max(2rem, calc((100% - 660px) / 2))",
            paddingRight: "max(2rem, calc((100% - 660px) / 2))",
          }}
        >
          <textarea
            ref={inputRef}
            rows={1}
            className="flex-1 text-sm resize-none leading-relaxed rounded px-4 py-3 border outline-none transition-colors"
            style={{
              background: "#FFFFFF",
              color: "#1A1714",
              borderColor: "#D9D0C6",
              fontFamily: "inherit",
            }}
            placeholder={
              hasPost
                ? "Refine: e.g. 'make the opener less structured' or 'cut the last paragraph'"
                : "Paste your rough notes"
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#7C6F5E";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#D9D0C6";
            }}
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
            className="text-sm font-medium rounded px-5 py-3 transition-colors cursor-pointer whitespace-nowrap disabled:cursor-not-allowed"
            style={{
              background: !input.trim() || isLoading ? "#E5DDD4" : "#1A1714",
              color: !input.trim() || isLoading ? "#A89E94" : "#FAF8F5",
            }}
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
      className="animate-spin h-4 w-4 inline-block shrink-0"
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
