import React from "react";

/**
 * Meera's Musings — Card
 * A sheet of paper on the desk. `tone` sets the surface; `elevation` the lift.
 */
export function Card({
  children,
  tone = "paper",
  elevation = "sm",
  bordered = true,
  padding = "lg",
  style = {},
  ...rest
}) {
  const tones = {
    paper:  { background: "var(--surface-card)",   color: "var(--text-body)",    border: "var(--border-hair)" },
    sunken: { background: "var(--surface-sunken)", color: "var(--text-body)",    border: "var(--border-hair)" },
    night:  { background: "var(--surface-night)",  color: "var(--text-on-night)", border: "var(--night-600)" },
  };
  const shadows = {
    none: "none",
    sm: "var(--shadow-sm)",
    md: "var(--shadow-md)",
    lg: "var(--shadow-lg)",
    page: "var(--shadow-page)",
  };
  const pads = { none: 0, sm: "var(--space-4)", md: "var(--space-5)", lg: "var(--space-6)" };

  const t = tones[tone] || tones.paper;

  return (
    <div
      style={{
        background: t.background,
        color: t.color,
        border: bordered ? `1px solid ${t.border}` : "1px solid transparent",
        borderRadius: "var(--radius-lg)",
        boxShadow: tone === "night" ? "var(--shadow-night)" : (shadows[elevation] || shadows.sm),
        padding: pads[padding] ?? pads.lg,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
