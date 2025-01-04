import { setup } from "./setup";

describe("Note Item", () => {
  it("should highlight on hover", () => {
    const { composeActions, stateManager } = setup();

    const props = composeActions([
      (props) => props.pageProps.wordTreeProps.onMenuClick(), // collapse
      (props) => props.pageProps.wordTreeProps.onMenuClick(), // uncollapse
      (props) => props.pageProps.wordTreeProps.childrenProps[0].onClick(), // select first
      // @ts-expect-error
      (props) => props.pageProps.wordTreeProps.childrenProps[2].onMouseOver(), // select third
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
          0,
          2,
        ],
      },
    },
  },
  "pageType": "Note",
}
`);
  });
});
