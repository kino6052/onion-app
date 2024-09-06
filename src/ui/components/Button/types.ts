import { PropsWithChildren } from "react";

export type TButtonProps = PropsWithChildren<{
  onClick: () => void;
  hasIcon: boolean;
  isDisabled?: boolean;
  ButtonComponent?: React.FC<TButtonProps>;
}>;
