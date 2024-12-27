import { TButtonProps } from "../../../../components/Button/types";
import { EPage, TAppState, TSetState } from "../../../../types";
import { TLogin, TLoginResponse } from "../../types";

const handleLoginSuccess = (
  result: TLoginResponse,
  setState: TSetState<TAppState>
) => {
  setState(
    (state) =>
      ({
        ...state,
        pageState: {
          ...state.pageState,
          isLoading: false,
        },
      }) as TAppState
  );

  if (result.error) {
    setState(
      (state) =>
        ({
          ...state,
          pageState: { ...state.pageState, message: result.error },
        }) as TAppState
    );
    return;
  }

  if (!result.ontology) {
    setState(
      (state) =>
        ({
          ...state,
          pageState: {
            ...state.pageState,
            message: "No ontology found",
          },
        }) as TAppState
    );
    return;
  }

  setState(() => ({
    pageType: EPage.Ontology,
    pageState: {
      isLoading: false,
      tree: result.ontology!,
    },
  }));
};

const handleLoginError = (setState: TSetState<TAppState>) => {
  setState((state) => ({
    pageType: EPage.Login,
    pageState: {
      ...state.pageState,
      isLoading: false,
      hasError: true,
      message: "Something went wrong",
    },
  }));
};

const handleClick = (login: TLogin, setState: TSetState<TAppState>) => {
  setState(
    (state) =>
      ({
        ...state,
        pageState: { ...state.pageState, isLoading: true },
      }) as TAppState
  );

  login()
    .then((result) => handleLoginSuccess(result, setState))
    .catch(() => handleLoginError(setState));
};

export const getMapStateToProps =
  (dependencies: { login: TLogin; ButtonComponent?: React.FC<TButtonProps> }) =>
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
