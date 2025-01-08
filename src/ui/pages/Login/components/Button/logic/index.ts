import { TAppState, TSetState } from "../../../../../../types";
import { TButtonProps } from "../../../../../components/Button/types";
import { TLogin } from "../../../../../../dependencies/login/types";
import { TMapStateToButtonProps } from "../types";
import { tryLogingIn } from "./login.case";

export const getMapStateToProps =
  (dependencies: {
    login: TLogin;
    ButtonComponent?: React.FC<TButtonProps>;
  }): TMapStateToButtonProps =>
  (state: TAppState, setState: TSetState<TAppState>) => {
    const { login, ButtonComponent } = dependencies;

    return {
      hasIcon: false,
      isDisabled: state.pageState.isLoading,
      onClick: () => tryLogingIn(login, setState),
      children: state.pageState.isLoading ? "Loading..." : "Login",
      ButtonComponent,
    };
  };
