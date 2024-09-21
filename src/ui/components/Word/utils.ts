import { TTextProps } from "../Text/types";
import { TWordProps } from "./types";

export const isTextComponent = (
  props: TTextProps | TWordProps
): props is TTextProps => {
  return typeof (props as Record<string, unknown>)?.index === "number";
};
