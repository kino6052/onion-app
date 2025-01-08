import { produce } from "immer";
import { TAppState, TSetState } from "../../../../../../types";
import { assertIsOntologiesPage } from "../../../logic/domain/utils.domain";

export const renameOntologyItem = (
  setState: TSetState<TAppState>,
  itemId: string
) => {
  setState(
    produce((draft: TAppState) => {
      assertIsOntologiesPage(draft);

      const item = draft.pageState.list.find((item) => item.id === itemId);
      if (item) {
        item.isMenuOpen = false;
        item.promptState = { text: item.text };
      }
    })
  );
};

export const removeOntologyItem = (
  setState: TSetState<TAppState>,
  itemId: string
) => {
  setState(
    produce((draft: TAppState) => {
      assertIsOntologiesPage(draft);

      const item = draft.pageState.list.find((item) => item.id === itemId);
      if (item) {
        item.promptState = {
          ...item.promptState,
          text: item.promptState?.text ?? "",
          isNotificationOnly: true,
          type: "remove",
        };
      }
    })
  );
};
