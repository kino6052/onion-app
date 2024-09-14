import { MouseEventHandler } from "react";

export type THighlightable = {
  isHighlighted: boolean;
};

export type TWithText = { text: string };

export type TWithIndex = { index: number };

export type TTextNode = TWithText & THighlightable;

export type TCollapsibleNode = {
  collapsed: TTextNode;
  uncollapsed: TTextNode;
};

export type TRangeComponentProps = TTextNode & TWithHandlers;

export type TWithHandlers = {
  onClick: MouseEventHandler;
  onMouseOver: MouseEventHandler;
};
