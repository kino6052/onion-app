import { setup } from "./setup";

describe("Note Item", () => {
  it("should summarize", () => {
    const { composeActions, stateManager } = setup();

    const props = composeActions([
      (props) => props.pageProps.wordTreeProps.onMenuClick(), // collapse
      (props) => props.pageProps.wordTreeProps.onMenuClick(), // uncollapse
      (props) => props.pageProps.wordTreeProps.childrenProps[2].onClick(), // select first
      (props) => props.pageProps.wordTreeProps.childrenProps[1].onClick(), // select third
    ]);

    expect(props).toMatchSnapshot();

    expect(stateManager.getState()).toMatchInlineSnapshot(`
{
  "pageState": {
    "id": "test",
    "isLoading": false,
    "ontologyId": "id",
    "wordTree": {
      "ROOT": {
        "closed": "ROOT",
        "editedName": undefined,
        "id": "ROOT",
        "isCollapsed": false,
        "isEditing": false,
        "open": "This is a test note.",
        "range": [
          1,
          null,
        ],
      },
    },
  },
  "pageType": "Note",
}
`);
  });
});
