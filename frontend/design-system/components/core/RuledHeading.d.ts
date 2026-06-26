import React from "react";

export type RuledHeadingTone = "accent" | "muted" | "strong";

/**
 * The signature divider for the writing app: an uppercase eyebrow label, a
 * hairline rule across the column, and optional trailing meta (word count,
 * version). Titles each draft / version block.
 */
export interface RuledHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Eyebrow text, e.g. "Your notes" or "Draft v2" */
  label: React.ReactNode;
  /** Right-aligned meta in mono, e.g. "1,204 / 3,000" */
  meta?: React.ReactNode;
  tone?: RuledHeadingTone;
}

export declare function RuledHeading(props: RuledHeadingProps): JSX.Element;
