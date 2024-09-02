export enum EPage {
  Login = "Login",
  Ontology = "Ontology",
  Note = "Note",
}

export type TAppProps = {
  page: EPage;
  pageProps: Record<string, unknown>;
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
