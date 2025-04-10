import { TLogin } from "../../../../../../dependencies/login/types";
import { withLoadingLogic } from "../../../../../../logic/utlis.domain";
import { TAppState, TSetState } from "../../../../../../types";
import { processLoginResult as _login, reportLoginError } from "./login.utils";

export const tryLogingIn = (login: TLogin, setState: TSetState<TAppState>) => {
  withLoadingLogic(setState)(
    login()
      .then((result) => _login(result, setState))
      .catch((e) =>
        reportLoginError(e?.message ?? "Something went wrong", setState)
      )
  );
};
