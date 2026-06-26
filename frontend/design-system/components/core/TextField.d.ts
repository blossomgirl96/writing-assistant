import React from "react";

/**
 * A calm writing input. Renders a `<textarea>` when `multiline`, otherwise an
 * `<input>`. Focus warms the border and adds a soft oxblood ring. Set `serif`
 * for prose-style entry (the drafting column); leave off for short UI fields.
 */
export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement> {
  /** Render a multi-line textarea */
  multiline?: boolean;
  /** Rows when multiline. Default 3. */
  rows?: number;
  /** Red border + error ring */
  invalid?: boolean;
  /** Use the reading serif at prose size */
  serif?: boolean;
}

export declare function TextField(props: TextFieldProps): JSX.Element;
