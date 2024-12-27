import { EPage, TAppProps, TAppState, TSetState } from "./types";

export const getMapStateToProps =
  (dependencies: {
    mapStateToLoginPageProps: (
      state: TAppState,
      setState: TSetState<TAppState>
    ) => TAppProps;
  }) =>
  (state: TAppState, setState: TSetState<TAppState>): TAppProps => {
    const { mapStateToLoginPageProps: mapLoginPageStateToProps } = dependencies;

    if (state.pageType === EPage.Login)
      return mapLoginPageStateToProps(state, setState);

    throw new Error("Not implemented");
  };
