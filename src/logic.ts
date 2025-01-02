import { mapStateToOntologiesProps } from "./pages/Ontologies";
import {
  EPage,
  TAppProps,
  TAppState,
  TMapStateToProps,
  TSetState,
} from "./types";

export const getMapStateToProps =
  (dependencies: {
    mapStateToLoginPageProps: TMapStateToProps<TAppState<EPage.Login>>;
    mapStateToOntologyProps: TMapStateToProps<TAppState<EPage.Ontology>>;
    mapStateToNoteProps: TMapStateToProps<TAppState<EPage.Note>>;
  }) =>
  (state: TAppState, setState: TSetState<TAppState>): TAppProps => {
    const {
      mapStateToLoginPageProps,
      mapStateToOntologyProps,
      mapStateToNoteProps,
    } = dependencies;

    if (state.pageType === EPage.Login)
      return mapStateToLoginPageProps(state, setState);

    if (state.pageType === EPage.Ontology)
      return mapStateToOntologyProps(state, setState);

    if (state.pageType === EPage.Ontologies)
      return mapStateToOntologiesProps(state, setState);

    if (state.pageType === EPage.Note)
      return mapStateToNoteProps(state, setState);

    throw new Error("Not implemented");
  };
