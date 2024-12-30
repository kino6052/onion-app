import { setup } from "./setup";

describe("Hierarchical Item", () => {
  it("should rename item", () => {
    const { stateManager, composeActions } = setup();

    const props = composeActions([
      // 1. Open menu on Root
      (props) => props?.onMenuClick?.(),

      // 2. Select "Rename" from menu on Root
      (props) =>
        props?.menuProps?.itemsProps
          .find(({ id }) => id.toLowerCase().includes("rename"))
          ?.onClick(),

      // 3. Input new name
      (props) => props.promptProps?.textProps?.onChange("new name"),

      // 4. Click "Apply"
      (props) => props?.promptProps?.buttonProps.onClick(),
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
        "promptState": undefined,
        "successors": [],
        "text": "new name",
      },
    },
  },
  "pageType": "Ontology",
}
`);
  });
});
