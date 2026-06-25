"use client";

import { useState, useRef, useEffect } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const STORAGE_KEY = "linkedin-assistant-session";

const SERIF = "var(--font-serif), Georgia, 'Times New Roman', serif";
const SANS = "var(--font-geist-sans), system-ui, -apple-system, sans-serif";

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

      pushMessage({ type: "ai", content: post, label: `Draft v${nextVersion}` });
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

  const newMusing = () => {
    setMessages([]);
    setInput("");
    setError("");
    setTimeout(() => inputRef.current?.focus(), 80);
  };

  const hasPost = messages.some((m) => m.type === "ai");
  const isEmpty = messages.length === 0 && !isLoading;

  if (!hydrated) return null;

  const gutter = {
    paddingLeft: "max(2rem, calc((100% - 760px) / 2))",
    paddingRight: "max(2rem, calc((100% - 760px) / 2))",
  };

  return (
    <main className="h-screen flex flex-col" style={{ background: "#FAF8F5", fontFamily: SANS }}>
      {/* Header */}
      <header
        className="px-8 py-4 flex items-center justify-between shrink-0 border-b"
        style={{ background: "#FAF8F5", borderColor: "#E7E0D7" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="leading-none"
            style={{ fontFamily: SERIF, fontSize: "30px", fontWeight: 600, color: "#6B2333" }}
          >
            M
          </span>
          <span className="flex flex-col leading-tight" style={{ fontFamily: SERIF }}>
            <span style={{ fontSize: "15px", color: "#2B2620" }}>Meera&rsquo;s</span>
            <span style={{ fontSize: "15px", fontStyle: "italic", color: "#8A7E6F" }}>musings</span>
          </span>
        </div>
        <button
          onClick={newMusing}
          className="text-sm px-4 py-2 rounded-md cursor-pointer border transition-colors flex items-center gap-1.5"
          style={{ color: "#5C5247", borderColor: "#D9D0C6", background: "transparent" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#1A1714";
            e.currentTarget.style.borderColor = "#A89E94";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#5C5247";
            e.currentTarget.style.borderColor = "#D9D0C6";
          }}
        >
          <span style={{ fontSize: "16px", lineHeight: 1 }}>+</span> New musing
        </button>
      </header>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto py-12 flex flex-col gap-6" style={gutter}>
        {isEmpty && (
          <div className="flex-1 flex flex-col items-center justify-center text-center min-h-[320px]">
            <h1 style={{ fontFamily: SERIF, fontSize: "44px", color: "#2B2620", lineHeight: 1.1 }}>
              What&rsquo;s on your mind?
            </h1>
            <p
              className="mt-6 max-w-md"
              style={{ fontFamily: SERIF, fontSize: "18px", color: "#9C8F81", lineHeight: 1.7 }}
            >
              Paste the rough version below &mdash; bullet points, a half-thought, the mess. Every
              draft stays on the page.
            </p>
          </div>
        )}

        {messages.map((msg) => {
          const isUser = msg.type === "user";
          const over = msg.content.length > 3000;
          return (
            <div
              key={msg.id}
              className="flex flex-col gap-2"
              style={{ alignItems: isUser ? "flex-end" : "flex-start" }}
            >
              <SenderTag who={isUser ? "Meera" : "Writie"} />

              {isUser ? (
                <div
                  className="whitespace-pre-wrap px-5 py-4"
                  style={{
                    background: "#ECE4DA",
                    color: "#7E7468",
                    fontSize: "16px",
                    lineHeight: 1.7,
                    maxWidth: "82%",
                    borderRadius: "16px",
                    borderTopRightRadius: "5px",
                  }}
                >
                  {msg.content}
                </div>
              ) : (
                <div
                  className="border px-6 py-5"
                  style={{
                    background: "#FFFFFF",
                    borderColor: "#E7E0D7",
                    maxWidth: "88%",
                    borderRadius: "16px",
                    borderTopLeftRadius: "5px",
                  }}
                >
                  <div
                    className="whitespace-pre-wrap"
                    style={{ color: "#3A332B", fontSize: "16px", lineHeight: 1.75, fontFamily: SERIF }}
                  >
                    {msg.content}
                  </div>
                  <div className="flex items-center justify-between gap-4 mt-4">
                    <span
                      className="text-xs tabular-nums"
                      style={{ color: over ? "#C0392B" : "#C4BAB0" }}
                    >
                      {msg.content.length.toLocaleString()} / 3,000
                    </span>
                    <button
                      onClick={() => copy(msg.id, msg.content)}
                      className="text-xs px-3 py-1.5 rounded cursor-pointer border transition-colors"
                      style={{
                        color: copiedId === msg.id ? "#1A1714" : "#A89E94",
                        borderColor: copiedId === msg.id ? "#A89E94" : "#E0D7CC",
                        background: "transparent",
                      }}
                    >
                      {copiedId === msg.id ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex flex-col gap-2" style={{ alignItems: "flex-start" }}>
            <SenderTag who="Writie" />
            <div
              className="border px-6 py-5 flex items-center gap-3"
              style={{
                background: "#FFFFFF",
                borderColor: "#E7E0D7",
                color: "#B3A89C",
                fontFamily: SERIF,
                fontSize: "16px",
                borderRadius: "16px",
                borderTopLeftRadius: "5px",
              }}
            >
              <Spinner />
              <span>{hasPost ? "Refining…" : "Writing…"}</span>
            </div>
          </div>
        )}

        {error && (
          <p className="text-sm px-1" style={{ color: "#C0392B" }}>
            {error}
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="shrink-0 border-t" style={{ background: "#FAF8F5", borderColor: "#E7E0D7" }}>
        <div className="py-5 flex gap-3 items-stretch" style={gutter}>
          <textarea
            ref={inputRef}
            rows={1}
            className="flex-1 text-base resize-none rounded-md px-4 py-3 border outline-none transition-colors"
            style={{
              background: "#FFFFFF",
              color: "#1A1714",
              borderColor: "#D9D0C6",
              fontFamily: SANS,
              lineHeight: 1.5,
            }}
            placeholder={
              hasPost
                ? "Refine: 'soften the opener' or 'cut the last line'"
                : "Paste your rough notes..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#B5888A";
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
            className="text-base font-medium rounded-md px-7 transition-colors cursor-pointer whitespace-nowrap disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{
              background: !input.trim() || isLoading ? "#DCD4CA" : hasPost ? "#B5888A" : "#8C7F6F",
              color: !input.trim() || isLoading ? "#AFA59A" : "#FAF8F5",
            }}
          >
            {isLoading ? (
              <>
                <Spinner />
                {hasPost ? "Refining…" : "Generating…"}
              </>
            ) : hasPost ? (
              <>
                <PencilIcon /> Refine
              </>
            ) : (
              "Generate"
            )}
          </button>
        </div>
      </div>
    </main>
  );
}

function SenderTag({ who }: { who: "Meera" | "Writie" }) {
  const isUser = who === "Meera";
  return (
    <div
      className="flex items-center gap-2"
      style={{ flexDirection: isUser ? "row-reverse" : "row" }}
    >
      <span
        className="flex items-center justify-center rounded-full shrink-0"
        style={{
          width: 26,
          height: 26,
          background: isUser ? "#6B2333" : "#8C7F6F",
          color: "#FAF8F5",
          fontFamily: SERIF,
          fontSize: "13px",
          fontWeight: 600,
          lineHeight: 1,
        }}
      >
        {isUser ? "M" : "W"}
      </span>
      <span className="text-xs" style={{ color: "#8A7E6F", letterSpacing: "0.04em", fontWeight: 600 }}>
        {who}
      </span>
    </div>
  );
}

function PencilIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
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
