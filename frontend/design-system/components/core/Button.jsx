import React from "react";

/**
 * Meera's Musings — Button
 * Quiet, letterpress-feeling buttons. Sans label, gentle settle on press.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  iconLeft = null,
  iconRight = null,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { fontSize: "var(--text-xs)", padding: "0.4rem 0.75rem", gap: "0.4rem" },
    md: { fontSize: "var(--text-sm)", padding: "0.65rem 1.1rem", gap: "0.5rem" },
    lg: { fontSize: "var(--text-base)", padding: "0.85rem 1.5rem", gap: "0.6rem" },
  };

  const palettes = {
    primary: {
      background: "var(--ink-900)",
      color: "var(--paper-50)",
      border: "1px solid var(--ink-900)",
    },
    accent: {
      background: "var(--accent)",
      color: "var(--text-on-accent)",
      border: "1px solid var(--accent)",
    },
    secondary: {
      background: "transparent",
      color: "var(--ink-800)",
      border: "1px solid var(--border)",
    },
    ghost: {
      background: "transparent",
      color: "var(--text-muted)",
      border: "1px solid transparent",
    },
  };

  const p = palettes[variant] || palettes.primary;
  const s = sizes[size] || sizes.md;

  const base = {
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--weight-semibold)",
    letterSpacing: "0.01em",
    lineHeight: 1,
    borderRadius: "var(--radius-sm)",
    cursor: disabled ? "not-allowed" : "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    whiteSpace: "nowrap",
    transition:
      "background var(--dur-base) var(--ease-quiet), color var(--dur-base) var(--ease-quiet), border-color var(--dur-base) var(--ease-quiet), transform var(--dur-fast) var(--ease-quiet)",
    fontSize: s.fontSize,
    padding: s.padding,
    opacity: disabled ? 0.45 : 1,
    ...p,
    ...style,
  };

  const onEnter = (e) => {
    if (disabled) return;
    if (variant === "primary") e.currentTarget.style.background = "var(--ink-800)";
    if (variant === "accent") e.currentTarget.style.background = "var(--accent-hover)";
    if (variant === "secondary") {
      e.currentTarget.style.borderColor = "var(--border-strong)";
      e.currentTarget.style.color = "var(--ink-900)";
    }
    if (variant === "ghost") e.currentTarget.style.color = "var(--ink-900)";
  };
  const onLeave = (e) => {
    Object.assign(e.currentTarget.style, {
      background: p.background,
      color: p.color,
      borderColor: p.border.split(" ").pop(),
    });
  };
  const onDown = (e) => { if (!disabled) e.currentTarget.style.transform = "translateY(0.5px) scale(0.992)"; };
  const onUp = (e) => { e.currentTarget.style.transform = "none"; };

  return (
    <button
      type={type}
      disabled={disabled}
      style={base}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseDown={onDown}
      onMouseUp={onUp}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
