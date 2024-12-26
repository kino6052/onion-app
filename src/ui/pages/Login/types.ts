import { TButtonProps } from "../../components/Button/types";
import {
  EPage,
  TMessageState,
  TIsLoadingState,
  TPageTypeState,
  THasErrorState,
} from "../../types";
import { FC } from "../../libs/react";

export type TLoginProps = TPageTypeState<EPage.Login> & {
  Component?: FC<TLoginProps>;
  message?: string;
  buttonProps: TButtonProps;
};

export type TLoginState = Partial<TMessageState> &
  TIsLoadingState &
  Partial<THasErrorState>;
