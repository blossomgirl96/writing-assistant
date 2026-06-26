import React, { useState } from "react";

/**
 * Meera's Musings — TextField
 * A calm writing input. Renders a textarea when `multiline`, else an input.
 * Focus warms the border to oxblood with a soft ring.
 */
export function TextField({
  multiline = false,
  rows = 3,
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  invalid = false,
  serif = false,
  style = {},
  ...rest
}) {
  const [focused, setFocused] = useState(false);

  const base = {
    width: "100%",
    fontFamily: serif ? "var(--font-serif)" : "var(--font-sans)",
    fontSize: serif ? "var(--text-md)" : "var(--text-sm)",
    lineHeight: serif ? "var(--leading-relaxed)" : "var(--leading-normal)",
    color: "var(--text-strong)",
    background: "var(--surface-card)",
    border: `1px solid ${invalid ? "var(--danger)" : focused ? "var(--border-focus)" : "var(--border)"}`,
    borderRadius: "var(--radius-sm)",
    padding: multiline ? "0.85rem 1rem" : "0.65rem 0.85rem",
    outline: "none",
    resize: multiline ? "vertical" : "none",
    boxShadow: focused ? (invalid ? "0 0 0 3px rgba(168,57,46,0.16)" : "var(--ring-accent)") : "var(--shadow-inset)",
    transition: "border-color var(--dur-base) var(--ease-quiet), box-shadow var(--dur-base) var(--ease-quiet)",
    opacity: disabled ? 0.55 : 1,
    ...style,
  };

  const handlers = {
    value,
    defaultValue,
    onChange,
    placeholder,
    disabled,
    onFocus: (e) => { setFocused(true); rest.onFocus && rest.onFocus(e); },
    onBlur: (e) => { setFocused(false); rest.onBlur && rest.onBlur(e); },
  };
  const { onFocus, onBlur, ...restProps } = rest;

  return multiline ? (
    <textarea rows={rows} style={base} {...handlers} {...restProps} />
  ) : (
    <input type="text" style={base} {...handlers} {...restProps} />
  );
}
