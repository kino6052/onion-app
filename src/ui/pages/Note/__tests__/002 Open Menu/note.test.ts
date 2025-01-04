import { setup } from "./setup";

describe("Note Item", () => {
  it("should initialize", () => {
    const { composeActions, stateManager } = setup();

    const props = composeActions([(props) => props]);

    expect(props).toMatchSnapshot();

    expect(stateManager.getState()).toMatchInlineSnapshot(`
{
  "pageState": {
    "id": "test",
    "isLoading": true,
    "ontologyId": "id",
    "wordTree": {
      "ROOT": {
        "closed": "ROOT",
        "id": "ROOT",
        "open": "This is a test note.",
      },
    },
  },
  "pageType": "Note",
}
`);
  });
});
