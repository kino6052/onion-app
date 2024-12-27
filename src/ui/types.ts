import { TWithIsMenuOpenState } from "./components/Item/types";
import { TPromptProps } from "./components/Prompt/types";
import { TLoginProps, TLoginState } from "./pages/Login/types";
import { TNoteProps, TNoteState } from "./pages/Note/types";
import { TOntologyProps, TOntologyState } from "./pages/Ontology/types";

export enum EPage {
  Login = "Login",
  Ontology = "Ontology",
  Note = "Note",
}

export type TWithId = { id: string };

export type TSetState<T> = (cb: (prev: T) => T) => void;

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

export type TCoordinates = { x: number; y: number };

export type TPromptState = {
  promptState: {
    text: string;
  };
};

export type TPageState<T> = { pageState: TDefaultPageState & T };

export type TDefaultPageState = TIsLoadingState &
  Partial<TMessageState> &
  Partial<THasErrorState> &
  Partial<TWithIsMenuOpenState>;

export type TLoginPageState = TPageTypeState<EPage.Login> & TPageState<{}>;
export type TOntologyPageState = TPageTypeState<EPage.Ontology> &
  TPageState<TOntologyState>;
export type TNotePageState = TPageTypeState<EPage.Note> &
  TPageState<TNoteState>;

export type TAppState = TLoginPageState | TOntologyPageState | TNotePageState;

export type TWithNotificationProps = {
  notificationProps: TPromptProps;
};

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
