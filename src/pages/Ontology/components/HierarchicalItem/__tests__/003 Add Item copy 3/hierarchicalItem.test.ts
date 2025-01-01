import { setup } from "./setup";

describe("Hierarchical Item", () => {
  it("should remove nested items", () => {
    const { stateManager, composeActions } = setup();

    const props = composeActions([
      // 1. Open menu on Root
      (props) => props?.onMenuClick?.(),

      // 2. Select "Add" from menu on Root
      (props) =>
        props?.menuProps?.itemsProps
          .find(({ id }) => id.toLowerCase().includes("add"))
          ?.onClick(),

      // 3. Open menu on the first successor of Root
      (props) => props?.successors[0]?.onMenuClick?.(),

      // 4. Select "Add" from menu on the first successor
      (props) =>
        props?.successors[0]?.menuProps?.itemsProps
          .find(({ id }) => id.toLowerCase().includes("add"))
          ?.onClick(),

      // 5. Open menu on the first successor of Root again
      (props) => props?.successors[0]?.onMenuClick?.(),

      // 6. Select "Remove" from menu on the first successor
      (props) =>
        props?.successors[0]?.menuProps?.itemsProps
          .find(({ id }) => id.toLowerCase().includes("remove"))
          ?.onClick(),
    ]);

    expect(props).toMatchSnapshot();

    expect(stateManager.getState()).toMatchInlineSnapshot(`
{
  "pageState": {
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
