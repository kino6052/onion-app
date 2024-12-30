import {
  EPage,
  TAppProps,
  TAppState,
  TMapStateToProps,
  TSetState,
} from "./types";

export const getMapStateToProps =
  (dependencies: {
    mapStateToLoginPageProps: TMapStateToProps;
    mapStateToOntologyProps: TMapStateToProps;
  }) =>
  (state: TAppState, setState: TSetState<TAppState>): TAppProps => {
    const { mapStateToLoginPageProps, mapStateToOntologyProps } = dependencies;

    if (state.pageType === EPage.Login)
      return mapStateToLoginPageProps(state, setState);

    if (state.pageType === EPage.Ontology)
      return mapStateToOntologyProps(state, setState);

    throw new Error("Not implemented");
  };
