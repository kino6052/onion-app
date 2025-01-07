import { produce } from "immer";
import { TAppState, TSetState } from "../../../types";
import { TOntologiesDependencies } from "../../../ui/pages/Ontologies/types";
import { setIsLoading, withLoadingLogic } from "../../utlis";
import { assertIsOntologiesPage } from "../utils";

export const removeOntology = (
  dependencies: TOntologiesDependencies,
  itemId: string,
  setState: TSetState<TAppState>
) => {
  return withLoadingLogic(setState)(
    dependencies
      .removeOntology(itemId)
      .then(() => {
        setIsLoading(false, setState);
      })
      .catch((error) => {
        setState(
          produce((draft: TAppState) => {
            assertIsOntologiesPage(draft);
            draft.pageState.hasError = true;
            draft.pageState.message = error.message;
          })
        );
      })
  );
};
