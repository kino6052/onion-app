import { EPage, TAppState } from "../../../../types";

export function assertIsOntologiesPage(
  state: TAppState
): asserts state is TAppState<EPage.Ontologies> {
  if (state.pageType !== EPage.Ontologies)
    throw new Error("Not the right page");
}
