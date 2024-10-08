import { HTMLProps, PropsWithChildren } from "react";
import { TMenuProps } from "../Menu/types";
import { TPromptProps } from "../Prompt/types";

type THandlers = {
  onClick: () => void;
  onMenuClick: () => void;
};

export type TItemProps = TItem & THandlers;
export type THierarchicalItemProps = PropsWithChildren<
  THierarchicalItem &
    THandlers & { menuProps: TMenuProps } & {
      promptProps?: TPromptProps;
    }
>;

export type TItem = {
  id: string;
  text: string;
};

export type THierarchicalItem = TItem & {
  successors: string[];
  isCollapsed: boolean;
  indent: number;
};
