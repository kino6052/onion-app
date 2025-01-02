import { TWithIsMenuOpenState } from "./components/Item/types";
import { TPromptProps } from "./components/Prompt/types";
import { TLoginProps, TLoginState } from "./pages/Login/types";
import { TNoteProps, TNoteState } from "./pages/Note/types";
import { TOntologiesProps, TOntologiesState } from "./pages/Ontologies/types";
import { TOntologyProps, TOntologyState } from "./pages/Ontology/types";

export enum EPage {
  Login = "Login",
  Ontology = "Ontology",
  Note = "Note",
  Ontologies = "Ontologies",
}

export type TWithId = { id: string };

export type TSetState<T> = (cb: (prev: T) => T) => void;

export type TMapStateToProps<TState = TAppState<EPage>, TProps = TAppProps> = (
  state: TState,
  setState: TSetState<TAppState>
) => TProps;

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
    isNotificationOnly?: boolean;
    type?: string;
  };
};

export type TPageState<T> = { pageState: TDefaultPageState & T };

export type TDefaultPageState = TIsLoadingState &
  Partial<TMessageState> &
  Partial<THasErrorState> &
  Partial<TWithIsMenuOpenState> &
  TWithId;

export type TLoginPageState = TPageTypeState<EPage.Login> & TPageState<{}>;
export type TOntologyPageState = TPageTypeState<EPage.Ontology> &
  TPageState<TOntologyState>;
export type TNotePageState = TPageTypeState<EPage.Note> &
  TPageState<TNoteState>;
export type TOntologiesPageState = TPageTypeState<EPage.Ontologies> &
  TPageState<TOntologiesState>;

export type TPageStateMap = {
  [EPage.Login]: TLoginPageState;
  [EPage.Ontology]: TOntologyPageState;
  [EPage.Note]: TNotePageState;
  [EPage.Ontologies]: TOntologiesPageState;
};

export type TAppState<TPage extends EPage = EPage> = TPageStateMap[TPage];

export type TWithNotificationProps = {
  notificationProps: TPromptProps;
};

export type TLoginPageProps = {
  pageType: EPage.Login;
  pageProps: TLoginProps;
};

export type TOntologyPageProps = {
  pageType: EPage.Ontology;
  pageProps: TOntologyProps;
};

export type TNotePageProps = {
  pageType: EPage.Note;
  pageProps: TNoteProps;
};

export type TOntologiesPageProps = {
  pageType: EPage.Ontologies;
  pageProps: TOntologiesProps;
};

export type TAppProps =
  | TLoginPageProps
  | TNotePageProps
  | TOntologyPageProps
  | TOntologiesPageProps;

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
