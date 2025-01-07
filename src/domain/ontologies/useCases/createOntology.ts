import { produce } from "immer";
import { TAppState, TSetState } from "../../../types";
import { TOntologiesDependencies } from "../../../ui/pages/Ontologies/types";
import { assertIsOntologiesPage } from "../utils";
import { EConstant } from "../../../constants";
import { withLoadingLogic } from "../../utlis";

export const createNewOntology = (
  setState: TSetState<TAppState>,
  dependencies: TOntologiesDependencies
) => {
  const newOntology = {
    id: dependencies.getUniqueId(),
    text: "New Ontology",
  };

  withLoadingLogic(setState)(
    dependencies.saveOntology(newOntology.id, {
      name: newOntology.text,
      map: {
        [EConstant.Root]: {
          id: EConstant.Root,
          isCollapsed: false,
          isMenuOpen: false,
          successors: [],
          text: "New Ontology",
        },
      },
    })
  )
    .then(() => {
      setState(
        produce((draft: TAppState) => {
          assertIsOntologiesPage(draft);
          draft.pageState.isLoading = false;
          draft.pageState.list.push({
            id: newOntology.id,
            text: newOntology.text,
          });
          draft.pageState.isMenuOpen = false;
        })
      );
    })
    .catch(() => {
      setState(
        produce((draft: TAppState) => {
          assertIsOntologiesPage(draft);
          draft.pageState.isLoading = false;
        })
      );
    });
};
