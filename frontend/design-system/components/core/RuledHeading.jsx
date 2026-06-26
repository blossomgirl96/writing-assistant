import React from "react";

/**
 * Meera's Musings — RuledHeading
 * The signature pattern: an uppercase eyebrow label, a hairline rule that
 * stretches across the column, and optional trailing meta (e.g. a word count).
 * Used to title every draft / version block in the writing app.
 */
export function RuledHeading({ label, meta = null, tone = "accent", style = {}, ...rest }) {
  const labelColor =
    tone === "accent" ? "var(--ink-600)" : tone === "muted" ? "var(--ink-400)" : "var(--ink-800)";

  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", ...style }}
      {...rest}
    >
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-xs)",
          fontWeight: "var(--weight-semibold)",
          letterSpacing: "var(--tracking-eyebrow)",
          textTransform: "uppercase",
          color: labelColor,
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <span style={{ flex: 1, height: 1, background: "var(--border-hair)" }} />
      {meta != null && (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-2xs)",
            color: "var(--ink-400)",
            flexShrink: 0,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {meta}
        </span>
      )}
    </div>
  );
}
