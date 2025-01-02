import { uniqueId } from "lodash";
import { TMenuProps } from "../../../../components/Menu/types";
import { getOntology } from "../../../../dependencies/getOntology/check";
import { logout } from "../../../../dependencies/logout/check";
import { FC } from "../../../../libs/react";
import { EPage, TAppState, TOntologiesPageState } from "../../../../types";
import { StateManager } from "../../../../utils/stateManager";
import { getMapStateToOntologiesProps } from "../../logic";
import { saveOntology } from "../../../../dependencies/saveOntology/check";

export const setup = () => {
  const initialState: TAppState = {
    pageType: EPage.Ontologies,
    pageState: {
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
  });

  return { stateManager, mapStateToProps };
};
