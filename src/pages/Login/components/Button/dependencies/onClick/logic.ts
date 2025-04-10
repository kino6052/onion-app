import { TLogin } from "../../../../../../dependencies/login/types";
import { TSetState, TAppState } from "../../../../../../types";
import { tryLogingIn } from "../../logic/login.case";

export const getOnClick = ({
  login,
  setState,
}: {
  login: TLogin;
  setState: TSetState<TAppState>;
}) => () => {
  tryLogingIn(login, setState);
};
