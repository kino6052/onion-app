import { setup } from "./setup";

describe("button test", () => {
  it("should login", async () => {
    const { onClick, mapStateToButtonProps, stateManager } = setup();

    const props = mapStateToButtonProps(
      stateManager.getState(),
      stateManager.setState.bind(stateManager)
    );

    props.onClick();

    expect(onClick).toHaveBeenCalledTimes(1);

    expect(stateManager.getState()).toMatchInlineSnapshot(`
{
  "pageState": {
    "id": "id",
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
    "hasError": false,
    "id": "id",
    "isLoading": false,
    "list": [],
    "message": "",
  },
  "pageType": "Ontologies",
}
`);
  });
});
