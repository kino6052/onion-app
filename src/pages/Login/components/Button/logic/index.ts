import { TAppState, TSetState } from "../../../../../types";
import { TButtonProps } from "../../../../../components/Button/types";
import { TMapStateToButtonProps } from "../types";

export const getMapStateToProps =
  (dependencies: {
    onClick: () => void;
    ButtonComponent?: React.FC<TButtonProps>;
  }): TMapStateToButtonProps =>
    (state: TAppState, setState: TSetState<TAppState>) => {
      const { onClick, ButtonComponent } = dependencies;

      return {
        hasIcon: false,
        isDisabled: state.pageState.isLoading,
        onClick,
        children: state.pageState.isLoading ? "Loading..." : "Login",
        ButtonComponent,
      };
    };
