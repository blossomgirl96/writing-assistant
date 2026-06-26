"use client";

import { useState, useRef, useEffect } from "react";
// @ts-ignore
import { Button } from "../design-system/components/core/Button";
// @ts-ignore
import { Card } from "../design-system/components/core/Card";
// @ts-ignore
import { TextField } from "../design-system/components/core/TextField";
// @ts-ignore
import { RuledHeading } from "../design-system/components/core/RuledHeading";
// @ts-ignore
import { Badge } from "../design-system/components/core/Badge";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const STORAGE_KEY = "linkedin-assistant-session";

type Message = {
  id: string;
  type: "user" | "ai";
  content: string;
  label: string;
  version?: number;
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

      pushMessage({ type: "ai", content: post, label: `Draft v${nextVersion}`, version: nextVersion });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setIsLoading(false);
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
  };

  const hasPost = messages.some((m) => m.type === "ai");
  const isEmpty = messages.length === 0 && !isLoading;
  const draftCount = messages.filter((m) => m.type === "ai").length;

  if (!hydrated) return null;

  const column = {
    width: "100%",
    maxWidth: "var(--measure-prose)",
    margin: "0 auto",
    padding: "0 var(--space-6)",
  };

  return (
    <main style={{ height: "100vh", display: "flex", flexDirection: "column", background: "var(--surface-app)" }}>
      {/* Header */}
      <header
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--space-4) var(--space-7)",
          borderBottom: "1px solid var(--border-hair)",
          background: "var(--surface-app)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-wordmark.svg" alt="Meera's musings" style={{ height: 38 }} />
        {messages.length > 0 && (
          <Button variant="secondary" size="sm" iconLeft={<PlusIcon />} onClick={newMusing}>
            New musing
          </Button>
        )}
      </header>

      {/* Conversation */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            ...column,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-8)",
            paddingTop: "var(--space-10)",
            paddingBottom: "var(--space-10)",
          }}
        >
          {isEmpty && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: "var(--space-4)",
                minHeight: 320,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-2xl)",
                  color: "var(--text-strong)",
                  lineHeight: 1.1,
                }}
              >
                What&rsquo;s on your mind?
              </div>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-md)",
                  color: "var(--text-muted)",
                  lineHeight: 1.7,
                  maxWidth: 360,
                  margin: 0,
                }}
              >
                Paste the rough version below &mdash; bullet points, a half-thought, the mess. Every
                draft stays on the page.
              </p>
            </div>
          )}

          {messages.map((msg) => {
            const isUser = msg.type === "user";
            const over = msg.content.length > 3000;
            const isPolished = (msg.version ?? 0) >= 2;

            return (
              <div key={msg.id} style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                <RuledHeading
                  label={msg.label}
                  tone={isUser ? "muted" : "accent"}
                  meta={!isUser ? `${msg.content.length.toLocaleString()} / 3,000` : undefined}
                />

                {isUser ? (
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "var(--text-sm)",
                      lineHeight: "var(--leading-normal)",
                      color: "var(--ink-700)",
                      whiteSpace: "pre-wrap",
                      background: "var(--surface-sunken)",
                      borderRadius: "var(--radius-md)",
                      padding: "var(--space-4) var(--space-5)",
                    }}
                  >
                    {msg.content}
                  </div>
                ) : (
                  <Card tone="paper" elevation="sm" padding="lg">
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "var(--space-4)" }}>
                      <Badge
                        tone={isPolished ? "gold" : "accent"}
                        variant={isPolished ? "solid" : "soft"}
                      >
                        {isPolished ? "Polished" : "Draft"}
                      </Badge>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "var(--text-2xs)",
                          color: "var(--text-faint)",
                        }}
                      >
                        v{msg.version}
                      </span>
                      {over && (
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-2xs)",
                            color: "var(--danger)",
                          }}
                        >
                          over limit
                        </span>
                      )}
                    </div>
                    <div className="mm-prose" style={{ whiteSpace: "pre-wrap" }}>
                      {msg.content.split("\n\n").map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "var(--space-4)" }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copy(msg.id, msg.content)}
                        iconLeft={
                          copiedId === msg.id ? (
                            <CheckIcon style={{ color: "var(--success)" }} />
                          ) : (
                            <CopyIcon />
                          )
                        }
                      >
                        {copiedId === msg.id ? "Copied" : "Copy"}
                      </Button>
                    </div>
                  </Card>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <RuledHeading label={`Draft v${draftCount + 1}`} />
              <Card tone="paper" elevation="sm" padding="lg">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-md)",
                  }}
                >
                  <span style={{ color: "var(--accent)" }}>
                    <Spinner />
                  </span>
                  {hasPost ? "Refining the line…" : "Finding the thread…"}
                </div>
              </Card>
            </div>
          )}

          {error && (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)",
                color: "var(--danger)",
                margin: 0,
              }}
            >
              {error}
            </p>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Composer */}
      <div
        style={{
          flexShrink: 0,
          borderTop: "1px solid var(--border-hair)",
          background: "var(--surface-app)",
        }}
      >
        <div
          style={{
            ...column,
            padding: "var(--space-4) var(--space-6)",
            display: "flex",
            gap: "var(--space-3)",
            alignItems: "flex-end",
          }}
        >
          <div style={{ flex: 1 }}>
            <TextField
              multiline
              rows={1}
              value={input}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                  e.preventDefault();
                  submit();
                }
              }}
              placeholder={
                hasPost
                  ? "Refine: 'soften the opener' or 'cut the last line'"
                  : "Paste your rough notes…"
              }
            />
          </div>
          <Button
            variant={hasPost ? "accent" : "primary"}
            onClick={submit}
            disabled={!input.trim() || isLoading}
            iconLeft={isLoading ? <Spinner /> : hasPost ? <PenIcon /> : null}
          >
            {isLoading ? "Working…" : hasPost ? "Refine" : "Generate"}
          </Button>
        </div>
      </div>
    </main>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function PenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}

function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: "spin 0.8s linear infinite" }}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.2" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
