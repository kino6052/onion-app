import { EPage } from "../../types";
import { noop } from "../../utils";
import { TLoginProps } from "./types";

export const getInitialLoginState = (): TLoginProps => ({
  buttonProps: {
    hasIcon: true,
    onClick: noop,
  },
  pageType: EPage.Login,
});
