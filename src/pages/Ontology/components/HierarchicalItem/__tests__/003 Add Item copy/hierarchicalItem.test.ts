import { setup } from "./setup";

describe("Hierarchical Item", () => {
  it("should close on background click", () => {
    const { stateManager, composeActions } = setup();

    const props = composeActions([
      (props) => props?.onMenuClick?.(),
      (props) => props?.menuProps?.onBackgroundClick(),
    ]);

    expect(props).toMatchSnapshot();

    expect(stateManager.getState()).toMatchInlineSnapshot(`
{
  "pageState": {
    "id": "id",
    "isLoading": true,
    "tree": {
      "ROOT": {
        "id": "ROOT",
        "isCollapsed": false,
        "isMenuOpen": false,
        "successors": [],
        "text": "ROOT",
      },
    },
  },
  "pageType": "Ontology",
}
`);
  });
});
