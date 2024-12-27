import { EConstant } from "../../../../../../../constants";
import { EPage, TAppState } from "../../../../../../types";
import { TLogin, TLoginResponse } from "../../../../types";
import { getMapStateToProps } from "../../logic";
import { StateManager } from "../../../../../../utils/stateManager";

export const setup = () => {
  const login: TLogin = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ontology: {
        [EConstant.Root]: {
          id: EConstant.Root,
          isCollapsed: false,
          isMenuOpen: false,
          successors: [],
          text: "",
        },
      },
    } satisfies TLoginResponse)
  );

  const initialState: TAppState = {
    pageType: EPage.Login,
    pageState: {
      isLoading: false,
      message: "",
    },
  };

  const stateManager = new StateManager<TAppState>(initialState);

  const mapStateToButtonProps = getMapStateToProps({
    login,
  });

  return { login, stateManager, mapStateToButtonProps };
};
