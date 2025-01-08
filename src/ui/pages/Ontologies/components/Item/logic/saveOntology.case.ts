import { TAppState, TSetState } from "../../../../../../types";
import { TExtendedItem, TOntologiesDependencies } from "../../../types";
import { withLoadingLogic } from "../../../../../logic/utlis.domain";

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
