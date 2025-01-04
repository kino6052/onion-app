import { setup } from "./setup";

describe("ontologies test", () => {
  it("should have matching initial state", async () => {
    const { mapStateToProps, stateManager } = setup();

    const props = mapStateToProps(
      stateManager.getState(),
      // @ts-expect-error
      stateManager.setState.bind(stateManager)
    );

    expect(props).toMatchSnapshot();

    expect(stateManager.getState()).toMatchInlineSnapshot(`
{
  "pageState": {
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
