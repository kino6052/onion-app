import { produce } from "immer";
import { EPage, TAppState, TSetState } from "../../../../../types";
import { TExtendedItem, TOntologiesDependencies } from "../../types";
import { setIsLoading } from "../../../../utils/utils";

export const getOntologies = (
  item: TExtendedItem,
  setState: TSetState<TAppState>,
  dependencies: TOntologiesDependencies
) => {
  setIsLoading(true, setState);

  dependencies
    .getOntology(item.id)
    .then((result) => {
      if (!result.map) throw new Error("No ontology content");

      setState(
        produce((draft: TAppState) => {
          draft.pageState = {
            id: item.id,
            isLoading: false,
            tree: result.map!,
            name: result.name,
          };
          draft.pageType = EPage.Ontology;
        })
      );
    })
    .then(() => {
      setIsLoading(false, setState);
    });
};
