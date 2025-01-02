import { TMenuProps } from "../../../components/Menu/types";
import { TGetOntology } from "../../../dependencies/getOntology/types";
import { TLogout } from "../../../dependencies/logout/types";
import { FC } from "../../../libs/react";
import {
  EPage,
  TMapStateToProps,
  TOntologiesPageProps,
  TOntologiesPageState,
} from "../../../types";
import { TOntologiesDependencies } from "../types";
import { createMenuProps } from "./menu";
import { createOntologiesProps } from "./ontologies";

export const getMapStateToOntologiesProps =
  (
    dependencies: TOntologiesDependencies
  ): TMapStateToProps<TOntologiesPageState, TOntologiesPageProps> =>
  (state, setState) => ({
    pageProps: {
      isLoading: state.pageState.isLoading,
      menuProps: createMenuProps(setState, dependencies, state),
      ontologiesProps: createOntologiesProps(setState, dependencies, state),
    },
    pageType: EPage.Ontologies,
  });
