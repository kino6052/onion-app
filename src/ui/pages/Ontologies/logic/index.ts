import {
  EPage,
  TMapStateToProps,
  TOntologiesPageProps,
  TOntologiesPageState,
} from "../../../../types";
import { TOntologiesDependencies } from "../types";
import { mapStateToMenuProps } from "./menu";
import { mapStateToOntologiesProps } from "./ontologies/ontologies";

export const getMapStateToOntologiesProps =
  (
    dependencies: TOntologiesDependencies
  ): TMapStateToProps<TOntologiesPageState, TOntologiesPageProps> =>
  (state, setState) => ({
    pageProps: {
      isLoading: state.pageState.isLoading,
      menuProps: mapStateToMenuProps(setState, dependencies, state),
      ontologiesProps: mapStateToOntologiesProps(setState, dependencies, state),
    },
    pageType: EPage.Ontologies,
  });
