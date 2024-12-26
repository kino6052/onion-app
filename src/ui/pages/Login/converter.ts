import { Button } from "../../components/Button/Button";
import { TButtonProps } from "../../components/Button/types";
import { THierarchicalItem } from "../../components/Item/types";
import { EPage, TAppProps, TAppState } from "../../types";
import { TLoginState } from "./types";

/** this function converts the state of the Login page into the props for the Login page.
 * It also handles the login logic, like loading the ontology and setting the state accordingly */
export const mapStateToProps =
  ({
    login = () => Promise.resolve({}),
    ButtonComponent,
  }: {
    login: () => Promise<{
      error?: string;
      ontology?: Record<string, THierarchicalItem>;
    }>;
    ButtonComponent: React.FC<TButtonProps>;
  }) =>
  (
    state: TAppState,
    setState: (cb: (state: TAppState) => TAppState) => void
  ): TAppProps => {
    if (state.pageType !== EPage.Login) {
      throw Error("Invalid page type");
    }

    return {
      pageType: EPage.Login,
      pageProps: {
        buttonProps: {
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
        },
        message: state.pageState.message,
        pageType: EPage.Login,
      },
    };
  };
