import { PropsWithChildren } from "../../../libs/react";

export type TIsSelected = { isSelected: boolean };

export type TTextProps = PropsWithChildren<
  Partial<TIsSelected> & {
    onClick: () => void;
    onMouseOver?: () => void;
  }
>;
