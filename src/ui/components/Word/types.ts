import { PropsWithChildren } from "react";
import { TTextProps } from "../Text/types";

export type TWordProps = {
  id: string;
  onClick: () => void;
  onMenuClick: () => void;
  isCollapsible: boolean;
  childrenProps: (TTextProps | TWordProps)[];
  Component?: React.FC<TWordProps>;
};
