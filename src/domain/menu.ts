import { produce } from "immer";
import { TAppState, TSetState } from "../types";
import { assertIsOntologiesPage } from "./ontologies/utils";

export const openMenu = (setState: TSetState<TAppState>) => {
  setState(
    produce((draft: TAppState) => {
      assertIsOntologiesPage(draft);
      draft.pageState.isMenuOpen = !draft.pageState.isMenuOpen;
    })
  );
};
