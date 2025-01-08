import { uniqueId } from "lodash";
import { TMenuProps } from "../../../../components/Menu/types";
import { getOntology } from "../../../../dependencies/getOntology/check";
import { ontologies } from "../../../../dependencies/getOntologies/data";
import { logout } from "../../../../dependencies/logout/check";
import { FC } from "../../../../libs/react";
import { EPage, TAppState, TOntologiesPageState } from "../../../../types";
import { StateManager } from "../../../../utils/stateManager";
import { getMapStateToOntologiesProps } from "../../logic";
import { getComposeActions } from "../../../../utils/composeActions";
import { saveOntology } from "../../../../dependencies/saveOntology/check";
import { removeOntology } from "../../../../dependencies/removeOntology/check";

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

  const composeActions = getComposeActions(() =>
    mapStateToProps(
      stateManager.getState(),
      // @ts-expect-error
      stateManager.setState.bind(stateManager)
    )
  );

  return { stateManager, mapStateToProps, composeActions, ontologies };
};
