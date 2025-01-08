import { EPage, TAppState } from "../../types";

export const DEFAULT_STATE = {
  pageType: EPage.Login,
  pageState: {
    isLoading: false,
    message: "",
    id: "",
  },
} satisfies TAppState;
