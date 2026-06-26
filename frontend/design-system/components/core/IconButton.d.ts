import React from "react";

export type IconButtonSize = "sm" | "md" | "lg";
export type IconButtonVariant = "ghost" | "outline" | "solid";

/**
 * A square, low-chrome control for icon-only toolbar actions
 * (copy, refine, start a new piece). Always pass `label` for a11y.
 */
export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Icon node (SVG / glyph) */
  children?: React.ReactNode;
  /** Accessible label, also used as tooltip */
  label: string;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  disabled?: boolean;
}

export declare function IconButton(props: IconButtonProps): JSX.Element;
