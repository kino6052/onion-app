import { produce } from "immer";
import { TAppState, TSetState } from "../../../../../../../types";
import { TExtendedItem, TOntologiesDependencies } from "../../../../types";
import { withLoadingLogic } from "../../../../../../logic/utlis.domain";
import { removeOntology } from "../../logic/removeOntology.case";
import { assertIsOntologiesPage } from "../../../../logic/domain/utils.domain";
import { saveOntology } from "../../logic/saveOntology.case";

export const removeOntologyFromList = (
  setState: TSetState<TAppState>,
  item: TExtendedItem,
  dependencies: TOntologiesDependencies
) => {
  withLoadingLogic(setState)(
    removeOntology(dependencies, item.id, setState)
  ).then(() => {
    setState(
      produce((draft: TAppState) => {
        assertIsOntologiesPage(draft);
        draft.pageState.list = draft.pageState.list.filter(
          (_item) => _item.id !== item.id
        );
      })
    );
  });
};

export const saveOntologyAndClosePrompt = (
  setState: TSetState<TAppState>,
  item: TExtendedItem,
  dependencies: TOntologiesDependencies
) => {
  withLoadingLogic(setState)(
    saveOntology(dependencies, item.id, setState, item)
  ).then(() => {
    setState(
      produce((draft: TAppState) => {
        assertIsOntologiesPage(draft);
        const targetItem = draft.pageState.list.find(
          (_item) => _item.id === item.id
        );
        if (targetItem) {
          targetItem.promptState = undefined;
          targetItem.text = item.promptState?.text ?? "";
        }
      })
    );
  });
};

export const applyPrompt = (
  setState: TSetState<TAppState>,
  item: TExtendedItem,
  dependencies: TOntologiesDependencies
) => {
  if (item.promptState?.type === "remove") {
    removeOntologyFromList(setState, item, dependencies);
  } else {
    saveOntologyAndClosePrompt(setState, item, dependencies);
  }
};
