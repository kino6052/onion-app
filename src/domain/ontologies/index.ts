import { produce } from "immer";
import { TAppState, TSetState } from "../../types";
import { assertIsOntologiesPage } from "./utils";

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

export const openItemMenu = (
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
