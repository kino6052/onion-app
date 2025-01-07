import { TAppState, TSetState } from "../../../types";
import {
  TExtendedItem,
  TOntologiesDependencies,
} from "../../../ui/pages/Ontologies/types";
import { withLoadingLogic } from "../../utlis";

export const saveOntology = (
  dependencies: TOntologiesDependencies,
  itemId: string,
  setState: TSetState<TAppState>,
  item: TExtendedItem
) => {
  return withLoadingLogic(setState)(
    dependencies.saveOntology(
      itemId,
      {
        name: item.promptState?.text ?? "",
      },
      true
    )
  );
};
