export enum EPage {
  Login = "Login",
  Ontology = "Ontology",
  Note = "Note",
}

export type TAppProps<T extends EPage> = {
  page: EPage;
  pageProps: Record<string, unknown>;
};
