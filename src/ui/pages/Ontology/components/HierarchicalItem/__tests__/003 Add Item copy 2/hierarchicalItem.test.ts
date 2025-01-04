import { setup } from "./setup";

describe("Hierarchical Item", () => {
  it("should create nested items", () => {
    const { stateManager, composeActions } = setup();

    const props = composeActions([
      (props) => props?.onMenuClick?.(),
      (props) =>
        props?.menuProps?.itemsProps
          .find(({ text }) => text.toLowerCase().includes("add"))
          ?.onClick(),
      (props) => props?.successors[0]?.onMenuClick?.(),
      (props) =>
        props?.successors[0]?.menuProps?.itemsProps
          .find(({ text }) => text.toLowerCase().includes("add"))
          ?.onClick(),
    ]);

    expect(props).toMatchSnapshot();

    expect(stateManager.getState()).toMatchInlineSnapshot(`
{
  "pageState": {
    "id": "id",
    "isLoading": true,
    "tree": {
      "1": {
        "id": "1",
        "isCollapsed": false,
        "isMenuOpen": false,
        "successors": [
          "2",
        ],
        "text": "New Item",
      },
      "2": {
        "id": "2",
        "isCollapsed": false,
        "isMenuOpen": false,
        "successors": [],
        "text": "New Item",
      },
      "ROOT": {
        "id": "ROOT",
        "isCollapsed": false,
        "isMenuOpen": false,
        "successors": [
          "1",
        ],
        "text": "ROOT",
      },
    },
  },
  "pageType": "Ontology",
}
`);
  });
});
