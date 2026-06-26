import React from "react";

/**
 * Meera's Musings — Badge
 * A small mark for a version, status, or tag. Quiet by default.
 */
export function Badge({ children, tone = "neutral", variant = "soft", style = {}, ...rest }) {
  const map = {
    neutral: { soft: ["var(--surface-sunken)", "var(--ink-700)", "transparent"], outline: ["transparent", "var(--ink-700)", "var(--border)"], solid: ["var(--ink-900)", "var(--paper-50)", "var(--ink-900)"] },
    accent:  { soft: ["rgba(114,47,55,0.10)", "var(--oxblood)", "transparent"], outline: ["transparent", "var(--oxblood)", "var(--oxblood-soft)"], solid: ["var(--oxblood)", "var(--paper-50)", "var(--oxblood)"] },
    gold:    { soft: ["rgba(156,122,60,0.12)", "var(--brass-deep)", "transparent"], outline: ["transparent", "var(--brass-deep)", "var(--brass-soft)"], solid: ["var(--brass)", "var(--ink-900)", "var(--brass)"] },
    success: { soft: ["rgba(92,107,79,0.14)", "var(--success)", "transparent"], outline: ["transparent", "var(--success)", "var(--success)"], solid: ["var(--success)", "var(--paper-50)", "var(--success)"] },
  };
  const [bg, fg, bd] = (map[tone] || map.neutral)[variant] || (map[tone] || map.neutral).soft;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35em",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-2xs)",
        fontWeight: "var(--weight-semibold)",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        lineHeight: 1,
        padding: "0.3em 0.6em",
        borderRadius: "var(--radius-sm)",
        background: bg,
        color: fg,
        border: `1px solid ${bd}`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
