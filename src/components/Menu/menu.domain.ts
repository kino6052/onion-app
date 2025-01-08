import { produce } from "immer";
import { TAppState, TSetState } from "../../types";
import { assertIsOntologiesPage } from "../../pages/Ontologies/logic/domain/utils.domain";

export const openMenu = (setState: TSetState<TAppState>) => {
  setState(
    produce((draft: TAppState) => {
      assertIsOntologiesPage(draft);
      draft.pageState.isMenuOpen = !draft.pageState.isMenuOpen;
    })
  );
};
