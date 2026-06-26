import React from "react";

export type ButtonVariant = "primary" | "accent" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * A quiet, letterpress-style button with a sans label.
 * Use `primary` (espresso ink) for the main page action, `accent` (oxblood)
 * for a brand-weighted call, `secondary` (outline) for adjacent actions,
 * and `ghost` for low-emphasis controls.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Label / content */
  children?: React.ReactNode;
  /** Visual weight. Default "primary". */
  variant?: ButtonVariant;
  /** Size. Default "md". */
  size?: ButtonSize;
  disabled?: boolean;
  /** Element rendered before the label */
  iconLeft?: React.ReactNode;
  /** Element rendered after the label */
  iconRight?: React.ReactNode;
}

export declare function Button(props: ButtonProps): JSX.Element;
