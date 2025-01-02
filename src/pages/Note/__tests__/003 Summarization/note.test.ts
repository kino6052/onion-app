import { setup } from "./setup";

describe("Note Item", () => {
  it("should summarize", () => {
    const { composeActions, stateManager } = setup();

    const props = composeActions([
      (props) => props.pageProps.wordTreeProps.onMenuClick(), // collapse
      (props) => props.pageProps.wordTreeProps.onMenuClick(), // uncollapse
      (props) => props.pageProps.wordTreeProps.childrenProps[0].onClick(), // select first
      (props) => props.pageProps.wordTreeProps.childrenProps[2].onClick(), // select third
    ]);

    expect(props).toMatchSnapshot();

    expect(stateManager.getState()).toMatchInlineSnapshot(`
{
  "pageState": {
    "id": "test",
    "isLoading": false,
    "wordTree": {
      "1": {
        "closed": "[summary]",
        "id": "1",
        "isCollapsed": true,
        "open": "This is a",
      },
      "ROOT": {
        "closed": "ROOT",
        "editedName": undefined,
        "id": "ROOT",
        "isCollapsed": false,
        "isEditing": false,
        "open": "{{1}} test note.",
        "range": [
          null,
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
