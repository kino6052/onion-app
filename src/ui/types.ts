import { TLoginProps } from "./pages/Login/types";
import { TOntologyProps } from "./pages/Ontology/types";

export enum EPage {
  Login = "Login",
  Ontology = "Ontology",
  Note = "Note",
}

export type TWithPageType<T, TPageType extends EPage> = T & {
  pageType: TPageType;
};

export type TAppProps = TLoginProps | TOntologyProps;

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
