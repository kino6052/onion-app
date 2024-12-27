import { PropsWithChildren } from "react";
import { TMenuProps } from "../Menu/types";
import { TPromptProps } from "../Prompt/types";
import { TPromptState } from "../../types";

type THandlers = {
  onClick: () => void;
  onMenuClick: () => void;
};

export type TWithMenuProps = { menuProps: TMenuProps };
export type TWithPromptProps = {
  promptProps?: TPromptProps;
};
export type TWithCollapsed = {
  isCollapsed: boolean;
};
export type TWithIndent = {
  indent: number;
};
export type TWithIsMenuOpenState = {
  isMenuOpen: boolean;
};

export type TItemProps = TItem & THandlers & Partial<{ menuProps: TMenuProps }>;

export type THierarchicalItemProps = PropsWithChildren<
  TItem & { successors: THierarchicalItemProps[] } & TWithCollapsed &
    TWithIsMenuOpenState &
    THandlers &
    Partial<TWithMenuProps> &
    TWithPromptProps &
    TWithIndent
>;

export type TItem = {
  id: string;
  text: string;
};

export type THierarchicalItem = TItem &
  TWithCollapsed &
  TWithIsMenuOpenState & {
    successors: string[];
  } & Partial<TPromptState>;
