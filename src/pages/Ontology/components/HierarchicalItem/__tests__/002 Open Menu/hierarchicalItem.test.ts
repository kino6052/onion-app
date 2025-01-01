import { setup } from "./setup";

describe("Hierarchical Item", () => {
  it("should open menu", () => {
    const { composeActions, stateManager } = setup();

    const props = composeActions([(props) => props.onMenuClick?.()]);

    expect(props?.id).toMatchInlineSnapshot(`"ROOT"`);

    expect(props).toMatchSnapshot();

    expect(stateManager.getState()).toMatchInlineSnapshot(`
{
  "pageState": {
    "isLoading": true,
    "tree": {
      "ROOT": {
        "id": "ROOT",
        "isCollapsed": false,
        "isMenuOpen": true,
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
