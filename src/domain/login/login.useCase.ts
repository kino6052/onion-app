import { produce } from "immer";
import { EPage, TAppState, TSetState } from "../../types";
import { TLoginResponse } from "../../dependencies/login/types";
import { TOntologiesState } from "../../ui/pages/Ontologies/types";

/**
 * Handles the successful login response and updates the application state accordingly.
 *
 * @param result - The login response containing the result of the login attempt.
 * @param setState - A function to update the application state.
 *
 * Domain/Use Case Logic:
 * - Sets the loading state to false.
 * - If there is an error in the result, updates the state with the error message and sets the error flag.
 * - If no ontologies are found in the result, updates the state with an appropriate message and sets the error flag.
 * - If the login is successful and ontologies are found, updates the state to reflect the ontologies page with the list of ontologies.
 */
export const login = (
  result: TLoginResponse,
  setState: TSetState<TAppState>
) => {
  setState(
    produce((draft: TAppState) => {
      if (result.error) {
        draft.pageState.message = result.error;
        draft.pageState.hasError = true;
        return;
      }

      if (!result.ontologies) {
        draft.pageState.message = "No ontology found";
        draft.pageState.hasError = true;
        return;
      }

      draft.pageType = EPage.Ontologies;
      draft.pageState.message = "";
      draft.pageState.hasError = false;
      (draft.pageState as TOntologiesState).list = result.ontologies;
    })
  );
};

/**
 * Handles the login error by updating the application state with the provided error message.
 *
 * @param errorMessage - The error message to be displayed.
 * @param setState - The function to update the application state.
 *
 * This function sets the following state properties:
 * - `pageType` to `EPage.Login`
 * - `pageState.isLoading` to `false`
 * - `pageState.hasError` to `true`
 * - `pageState.message` to the provided `errorMessage`
 */
export const reportLoginError = (
  errorMessage: string,
  setState: TSetState<TAppState>
) => {
  setState(
    produce((draft: TAppState) => {
      draft.pageType = EPage.Login;
      draft.pageState.hasError = true;
      draft.pageState.message = errorMessage;
    })
  );
};
