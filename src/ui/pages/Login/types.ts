import { TButtonProps } from "../../components/Button/types";
import { THierarchicalItem } from "../../components/Item/types";
import { FC } from "../../libs/react";
import { THasErrorState, TIsLoadingState, TMessageState } from "../../types";

export type TLoginResponse = {
  error?: string;
  ontology?: Record<string, THierarchicalItem>;
};

export type TLogin = () => Promise<TLoginResponse>;

export type TLoginProps = {
  Component?: FC<TLoginProps>;
  message?: string;
  buttonProps: TButtonProps;
};

export type TLoginState = Partial<TMessageState> &
  TIsLoadingState &
  Partial<THasErrorState>;
