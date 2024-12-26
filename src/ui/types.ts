import { TLoginProps, TLoginState } from "./pages/Login/types";
import { TNoteProps, TNoteState } from "./pages/Note/types";
import { TOntologyProps, TOntologyState } from "./pages/Ontology/types";

export enum EPage {
  Login = "Login",
  Ontology = "Ontology",
  Note = "Note",
}

export type TPageTypeState<TPageType extends EPage> = {
  pageType: TPageType;
};

export type TIsLoadingState = {
  isLoading: boolean;
};

export type TMessageState = {
  message: string;
};

export type THasErrorState = {
  hasError: boolean;
};

export type TWithComponent<T extends Record<string, unknown>> = {
  Component?: React.FC<T>;
};

export type TPageState<T> = { pageState: T };

export type TAppState =
  | (TPageTypeState<EPage.Login> & TPageState<TLoginState>)
  | (TPageTypeState<EPage.Ontology> & TPageState<TOntologyState>)
  | (TPageTypeState<EPage.Note> & TPageState<TNoteState>);

export type TAppProps = {
  pageType: EPage;
  pageProps: TLoginProps | TOntologyProps | TNoteProps;
};

type OmitNullish<T> = {
  [K in keyof T as T[K] extends NonNullable<T[K]> ? K : never]: T[K];
};

export type TWithoutBehavior<T extends unknown> = OmitNullish<{
  [P in keyof T]: T[P] extends (infer U)[]
    ? TWithoutBehavior<U>[]
    : T[P] extends object
      ? T[P] extends (...args: any[]) => any
        ? undefined
        : TWithoutBehavior<T[P]>
      : T[P]; // NOTE: otherwise
}>;
