import React from "react";

export type CardTone = "paper" | "sunken" | "night";
export type CardElevation = "none" | "sm" | "md" | "lg" | "page";
export type CardPadding = "none" | "sm" | "md" | "lg";

/**
 * A sheet of paper on the desk — the default container for content blocks.
 * `tone` picks the surface (white paper, sunken parchment, or night study),
 * `elevation` the shadow lift.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  tone?: CardTone;
  elevation?: CardElevation;
  bordered?: boolean;
  padding?: CardPadding;
}

export declare function Card(props: CardProps): JSX.Element;
