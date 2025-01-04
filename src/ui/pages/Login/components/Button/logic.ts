import { TButtonProps } from "../../../../components/Button/types";
import { TLogin, TLoginResponse } from "../../../../dependencies/login/types";
import { EPage, TAppState, TSetState } from "../../../../../types";
import { TMapStateToButtonProps } from "./types";

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

  if (!result.ontologies) {
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
    pageType: EPage.Ontologies,
    pageState: {
      id: "",
      isLoading: false,
      list: result.ontologies!,
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
