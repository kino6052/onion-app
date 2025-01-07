import { produce } from "immer";
import { EPage, TAppState, TSetState } from "../types";

export const withLoadingLogic =
  (setState: TSetState<TAppState>) =>
  <T>(promise: Promise<T>): Promise<T> => {
    setIsLoading(true, setState);

    return promise.finally(() => {
      setIsLoading(false, setState);
    });
  };

export const setIsLoading = (
  isLoading: boolean,
  setState: TSetState<TAppState>,
  page?: EPage // TODO: Remove
) => {
  setState(
    produce((draft: TAppState) => {
      draft.pageState.isLoading = isLoading;
    })
  );
};
