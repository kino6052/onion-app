import { merge } from "../libs/lodash";
import { EPage, TAppState, TSetState } from "../types";
import { TWithRecursiveFallback } from "./types";

export const setPartial = <TPage extends EPage>(
  state: TWithRecursiveFallback<TAppState<TPage>, undefined>,
  setState: TSetState<TAppState<TPage>>,
  page: TPage
) => {
  setState((prevState) => {
    if (prevState.pageType !== page)
      throw new Error(`Current page is not "${page}" page`);

    const result = merge({}, prevState, state);

    return result;
  });
};
