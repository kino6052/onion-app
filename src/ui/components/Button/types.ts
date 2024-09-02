import { PropsWithChildren } from "react";

export type TButtonProps = PropsWithChildren<{
  onClick: () => void;
  hasIcon: boolean;
}>;
