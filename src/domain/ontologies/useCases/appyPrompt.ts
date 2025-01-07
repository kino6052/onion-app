import { produce } from "immer";
import { TAppState, TSetState } from "../../../types";
import {
  TExtendedItem,
  TOntologiesDependencies,
} from "../../../ui/pages/Ontologies/types";
import { withLoadingLogic } from "../../utlis";
import { removeOntology } from "./removeOntology";
import { assertIsOntologiesPage } from "../utils";
import { saveOntology } from "./saveOntology";

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
