import { produce } from "immer";
import { TAppState, TSetState } from "../../../../../../../types";
import { assertIsOntologiesPage } from "../../../../../logic/domain/utils.domain";

export const closeOntologyItemMenu = (
  setState: TSetState<TAppState>,
  itemId: string
) => {
  setState(
    produce((draft: TAppState) => {
      assertIsOntologiesPage(draft);

      const item = draft.pageState.list.find((item) => item.id === itemId);
      if (item) {
        item.isMenuOpen = false;
      }
    })
  );
};

export const openOntologyItemMenu = (
  setState: TSetState<TAppState>,
  itemId: string
) => {
  setState(
    produce((draft: TAppState) => {
      assertIsOntologiesPage(draft);

      const item = draft.pageState.list.find((item) => item.id === itemId);
      if (item) {
        item.isMenuOpen = !item.isMenuOpen;
      }
    })
  );
};
