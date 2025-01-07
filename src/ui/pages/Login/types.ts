import { TButtonProps } from "../../components/Button/types";
import { FC } from "../../../libs/react";
import { THasErrorState, TIsLoadingState, TMessageState } from "../../../types";

export type TLoginProps = {
  Component?: FC<TLoginProps>;
  message?: string;
  buttonProps: TButtonProps;
};

export type TLoginState = Partial<TMessageState> &
  TIsLoadingState &
  Partial<THasErrorState>;
