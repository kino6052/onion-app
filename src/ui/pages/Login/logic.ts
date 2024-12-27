import { TButtonProps } from "../../components/Button/types";
import { EPage, TAppProps, TAppState, TSetState } from "../../types";

/** this function converts the state of the Login page into the props for the Login page.
 * It also handles the login logic, like loading the ontology and setting the state accordingly */
export const mapStateToProps =
  ({
    mapStateToButtonProps,
  }: {
    mapStateToButtonProps: (
      state: TAppState,
      setState: TSetState<TAppState>
    ) => TButtonProps;
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
        buttonProps: mapStateToButtonProps(state, setState),
        message: state.pageState.message,
      },
    };
  };
