import { uniqueId } from "lodash";
import { TMenuProps } from "../../../../components/Menu/types";
import { getOntology } from "../../../../dependencies/hierarchy/ontology/getOntology/check";
import { logout } from "../../../../dependencies/logout/check";
import { FC } from "../../../../libs/react";
import { EPage, TAppState, TOntologiesPageState } from "../../../../types";
import { StateManager } from "../../../../utils/stateManager";
import { getMapStateToOntologiesProps } from "../../logic";
import { saveOntology } from "../../../../dependencies/hierarchy/ontology/saveOntology/check";
import { removeOntology } from "../../../../dependencies/hierarchy/ontology/removeOntology/check";

export const setup = () => {
  const initialState: TAppState = {
    pageType: EPage.Ontologies,
    pageState: {
      id: "id",
      isLoading: false,
      message: "",
      list: [],
    },
  };

  const stateManager = new StateManager<TOntologiesPageState>(initialState);

  const mapStateToProps = getMapStateToOntologiesProps({
    getOntology,
    getUniqueId: uniqueId,
    logout,
    Menu: (() => ({})) as unknown as FC<TMenuProps>,
    saveOntology,
    removeOntology,
  });

  return { stateManager, mapStateToProps };
};
