import { TButtonProps } from "../../../../components/Button/types";
import { EPage, TAppState, TSetState } from "../../../../types";
import { TLogin } from "../../types";

export const getMapStateToProps =
  (dependencies: { login: TLogin; ButtonComponent?: React.FC<TButtonProps> }) =>
  (state: TAppState, setState: TSetState<TAppState>) => {
    const { login, ButtonComponent } = dependencies;

    return {
      hasIcon: false,
      isDisabled: state.pageState.isLoading,
      onClick: () => {
        setState(
          (state) =>
            ({
              ...state,
              pageState: { ...state.pageState, isLoading: true },
            }) as TAppState
        );
        login().then((result) => {
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

          setState((state) => ({
            pageType: EPage.Ontology,
            pageState: {
              isLoading: false,
              tree: result.ontology!,
            },
          }));
        });
      },
      children: state.pageState.isLoading ? "Loading..." : "Login",
      ButtonComponent,
    };
  };
