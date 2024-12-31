import { HTMLInputTypeAttribute, HTMLProps } from "react";
import { TMenuProps } from "../Menu/types";
import { TPromptProps } from "../Prompt/types";
import { TTextProps } from "../Text/types";
import { TButtonProps } from "../Button/types";

export type TCollapsible = {
  text: string;
  isCollapsible: boolean;
  isOpen?: boolean;
};

export type TWordProps = {
  id: string;
  onClick: () => void;
  onMenuClick: () => void;
  childrenProps: (TTextProps | TWordProps)[];
  Component?: React.FC<TWordProps>;
} & TCollapsible &
  Partial<{ menuProps: TMenuProps }> &
  Partial<{ promptProps: TPromptProps }> &
  Partial<{
    editProps: {
      inputProps: HTMLProps<HTMLInputElement>;
      confirmButtonProps: HTMLProps<HTMLButtonElement>;
      rejectButtonProps: HTMLProps<HTMLButtonElement>;
      removeButtonProps: HTMLProps<HTMLButtonElement>;
    };
  }>;
