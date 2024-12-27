import { setup } from "./utils";

describe("button test", () => {
  it("should login", async () => {
    // Setup
    const { login, mapStateToButtonProps, stateManager } = setup();

    // Core
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
