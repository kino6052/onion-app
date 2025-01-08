import { produce } from "immer";
import { TAppState, TSetState } from "../../../../../../types";
import { assertIsOntologiesPage } from "../../../../logic/domain/utils.domain";

export const closeOntologyItemPrompt = (
  setState: TSetState<TAppState>,
  itemId: string
) => {
  setState(
    produce((draft: TAppState) => {
      assertIsOntologiesPage(draft);

      draft.pageState.list = draft.pageState.list.map((item) => {
        if (item.id !== itemId) return item;
        return { ...item, promptState: undefined };
      });
    })
  );
};

export const updateOntologyItemPromptField = (
  setState: TSetState<TAppState>,
  itemId: string,
  value: string
) => {
  setState(
    produce((draft: TAppState) => {
      assertIsOntologiesPage(draft);

      const item = draft.pageState.list.find((item) => item.id === itemId);
      if (item) {
        item.promptState = { text: value };
      }
    })
  );
};
