import { TButtonProps } from "../../components/Button/types";
import { EPage, TWithPageType } from "../../types";

export type TLoginProps = TWithPageType<
  {
    message?: string;
    buttonProps: TButtonProps;
  },
  EPage.Login
>;
