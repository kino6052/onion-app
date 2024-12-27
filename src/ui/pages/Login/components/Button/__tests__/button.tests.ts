import { EConstant } from "../../../../../../constants";
import { EPage, TAppState, TSetState } from "../../../../../types";
import { TLogin, TLoginResponse } from "../../../types";
import { getMapStateToProps } from "../logic";
import { StateManager } from "./stateManager";

describe("button test", () => {
  it("should login", async () => {
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

    const props = mapStateToButtonProps(
      stateManager.getState(),
      stateManager.setState.bind(stateManager)
    );

    props.onClick();

    expect(login).toHaveBeenCalledTimes(1);

    expect(stateManager.getState()).toMatchInlineSnapshot(`
{
  "pageState": {
    "isLoading": true,
    "message": "",
  },
  "pageType": "Login",
}
`);

    await stateManager.waitFor((state) => !state.pageState.isLoading);

    expect(stateManager.getState()).toMatchInlineSnapshot(`
{
  "pageState": {
    "isLoading": false,
    "tree": {
      "ROOT": {
        "id": "ROOT",
        "isCollapsed": false,
        "isMenuOpen": false,
        "successors": [],
        "text": "",
      },
    },
  },
  "pageType": "Ontology",
}
`);
  });
});
