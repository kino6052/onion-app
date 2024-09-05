import { PropsWithChildren } from "react";

type THandlers = {
  onClick: () => void;
  onMenuClick: () => void;
};

export type TItemProps = TItem & THandlers;
export type THierarchicalItemProps = PropsWithChildren<
  THierarchicalItem & THandlers
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
