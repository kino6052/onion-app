import {
  reportLoginError,
  login as _login,
} from "../../../../../../domain/login/login.useCase";
import { TAppState, TSetState } from "../../../../../../types";
import { TLogin } from "../../../../../../dependencies/login/types";
import { setIsLoading } from "../../../../../utils/utils";

export const handleClick = (login: TLogin, setState: TSetState<TAppState>) => {
  setIsLoading(true, setState);

  login()
    .then((result) => _login(result, setState))
    .catch((e) =>
      reportLoginError(e?.message ?? "Something went wrong", setState)
    )
    .finally(() => {
      setIsLoading(false, setState);
    });
};
