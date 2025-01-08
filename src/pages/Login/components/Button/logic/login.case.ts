import { reportLoginError, processLoginResult as _login } from "./login.utils";
import { TAppState, TSetState } from "../../../../../types";
import { TLogin } from "../../../../../dependencies/login/types";
import { setIsLoading } from "../../../../../utils/utils";
import { withLoadingLogic } from "../../../../../logic/utlis.domain";

export const tryLogingIn = (login: TLogin, setState: TSetState<TAppState>) => {
  withLoadingLogic(setState)(
    login()
      .then((result) => _login(result, setState))
      .catch((e) =>
        reportLoginError(e?.message ?? "Something went wrong", setState)
      )
      .finally(() => {
        setIsLoading(false, setState);
      })
  );
};
