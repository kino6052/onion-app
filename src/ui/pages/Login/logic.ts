import { EPage, TAppProps, TAppState } from "../../types";
import { TMapStateToButtonProps } from "./components/Button/types";

/** this function converts the state of the Login page into the props for the Login page.
 * It also handles the login logic, like loading the ontology and setting the state accordingly */
export const getMapStateToProps =
  ({
    mapStateToButtonProps,
  }: {
    mapStateToButtonProps: TMapStateToButtonProps;
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
