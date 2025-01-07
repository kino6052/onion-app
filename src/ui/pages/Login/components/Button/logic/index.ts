import { TAppState, TSetState } from "../../../../../../types";
import { TButtonProps } from "../../../../../components/Button/types";
import { TLogin } from "../../../../../dependencies/login/types";
import { TMapStateToButtonProps } from "../types";
import { handleClick } from "./login";

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
      onClick: () => handleClick(login, setState),
      children: state.pageState.isLoading ? "Loading..." : "Login",
      ButtonComponent,
    };
  };
