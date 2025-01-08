import { setup } from "./setup";

describe("Hierarchical Item", () => {
  it("should open rename prompt", () => {
    const { stateManager, composeActions } = setup();

    const props = composeActions([
      // 1. Open menu on Root
      (props) => props?.onMenuClick?.(),

      // 2. Select "Rename" from menu on Root
      (props) =>
        props?.menuProps?.itemsProps
          .find(({ id }) => id.toLowerCase().includes("rename"))
          ?.onClick(),
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
        "promptState": {
          "text": "ROOT",
        },
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
