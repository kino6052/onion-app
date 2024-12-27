import { setup } from "./utils";

describe("button test", () => {
  it("should produce error", async () => {
    const { login, mapStateToButtonProps, stateManager } = setup();

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
    "hasError": true,
    "isLoading": false,
    "message": "Something went wrong",
  },
  "pageType": "Login",
}
`);
  });
});
