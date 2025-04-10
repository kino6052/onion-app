import {
  TLogin,
  TLoginResponse,
} from "../../../../../../dependencies/login/types";
import { EPage, TAppState } from "../../../../../../types";
import { StateManager } from "../../../../../../utils/stateManager";
import { getMapStateToProps } from "../../logic";

export const setup = () => {
  const onClick: TLogin = jest.fn().mockImplementation(() =>
    Promise.resolve({
      error: "Error",
    } satisfies TLoginResponse)
  );

  const initialState: TAppState = {
    pageType: EPage.Login,
    pageState: {
      isLoading: false,
      message: "",
      id: "id",
    },
  };

  const stateManager = new StateManager<TAppState>(initialState);

  const mapStateToButtonProps = getMapStateToProps({
    onClick,
  });

  return { onClick, stateManager, mapStateToButtonProps };
};
