import { PropsWithChildren } from "react";

export type TButtonProps = PropsWithChildren<
  {
    onClick: () => void;
    isDisabled?: boolean;
    ButtonComponent?: React.FC<TButtonProps>;
  } & Partial<{ hasIcon: boolean }>
>;
