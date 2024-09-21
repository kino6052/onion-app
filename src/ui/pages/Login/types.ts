import { TButtonProps } from "../../components/Button/types";
import { EPage, TWithPageType } from "../../types";
import { FC } from "../../libs/react";

export type TLoginProps = TWithPageType<
  {
    Component?: FC<TLoginProps>;
    message?: string;
    buttonProps: TButtonProps;
  },
  EPage.Login
>;
