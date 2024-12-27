import { EPage, TAppState } from "../../../../../../types";
import { TLogin } from "../../../../types";
import { getMapStateToProps } from "../../logic";
import { StateManager } from "../../../../../../utils/stateManager";

export const setup = () => {
  const login: TLogin = jest.fn().mockImplementation(() => Promise.reject());

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
