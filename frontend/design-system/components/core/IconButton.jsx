import React from "react";

/**
 * Meera's Musings — IconButton
 * Square, low-chrome control for toolbar actions (copy, refine, new).
 */
export function IconButton({
  children,
  label,
  size = "md",
  variant = "ghost",
  disabled = false,
  style = {},
  ...rest
}) {
  const dims = { sm: 28, md: 34, lg: 40 }[size] || 34;

  const palettes = {
    ghost: { background: "transparent", color: "var(--text-muted)", border: "1px solid transparent" },
    outline: { background: "transparent", color: "var(--ink-700)", border: "1px solid var(--border)" },
    solid: { background: "var(--ink-900)", color: "var(--paper-50)", border: "1px solid var(--ink-900)" },
  };
  const p = palettes[variant] || palettes.ghost;

  const base = {
    width: dims,
    height: dims,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "var(--radius-sm)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    transition: "background var(--dur-base) var(--ease-quiet), color var(--dur-base) var(--ease-quiet), border-color var(--dur-base) var(--ease-quiet)",
    ...p,
    ...style,
  };

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      style={base}
      onMouseEnter={(e) => { if (!disabled) { e.currentTarget.style.color = "var(--ink-900)"; if (variant !== "solid") e.currentTarget.style.background = "var(--surface-sunken)"; } }}
      onMouseLeave={(e) => { Object.assign(e.currentTarget.style, { color: p.color, background: p.background }); }}
      {...rest}
    >
      {children}
    </button>
  );
}
