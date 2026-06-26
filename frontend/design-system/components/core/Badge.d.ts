import React from "react";

export type BadgeTone = "neutral" | "accent" | "gold" | "success";
export type BadgeVariant = "soft" | "outline" | "solid";

/**
 * A small uppercase mark for a version, status, or tag.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  tone?: BadgeTone;
  variant?: BadgeVariant;
}

export declare function Badge(props: BadgeProps): JSX.Element;
