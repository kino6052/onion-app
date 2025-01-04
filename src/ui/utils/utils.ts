import { EPage, TAppState, TSetState } from "../../types";
import { setPartial } from "./setPartial";

export const setIsLoading = (
  isLoading: boolean,
  setState: TSetState<TAppState>,
  page: EPage
) => {
  setPartial(
    {
      pageState: {
        isLoading,
      },
    },
    setState,
    page
  );
};
