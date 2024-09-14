import { PropsWithChildren } from "react";

export type TWordProps = {
  id: string;
  onClick: () => void;
  onMenuClick: () => void;
  isCollapsible: boolean;
  childrenProps: (string | TWordProps)[];
  Component?: React.FC<TWordProps>;
  getTextComponent?: () => React.FC<PropsWithChildren>;
};
