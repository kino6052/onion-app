import { produce } from "immer";
import { EPage, TAppState, TSetState } from "../../types";
import { TOntologiesDependencies } from "../pages/Ontologies/types";
import { withLoadingLogic } from "./utlis.domain";

export const logout = (
  setState: TSetState<TAppState>,
  dependencies: TOntologiesDependencies
) => {
  withLoadingLogic(setState)(dependencies.logout()).then(() => {
    setState(
      produce((draft: TAppState) => {
        draft.pageState = {
          id: "",
          isLoading: false,
        };
        draft.pageType = EPage.Login;
      })
    );
  });
};
