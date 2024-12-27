import { setup } from "./setup";

describe("Hierarchical Item", () => {
  it("should have an initial state", () => {
    const { mapStateToButtonProps, stateManager } = setup();

    expect(
      mapStateToButtonProps(
        stateManager.getState(),
        stateManager.setState.bind(stateManager)
      )
    ).toMatchInlineSnapshot(`
{
  "id": "ROOT",
  "indent": 0,
  "isCollapsed": false,
  "isMenuOpen": false,
  "menuProps": {
    "Component": {},
    "id": "menu",
    "isOpen": false,
    "itemsProps": [
      {
        "id": "ontology",
        "onClick": [Function],
        "onMenuClick": [Function],
        "text": "Ontology",
      },
    ],
    "onBackgroundClick": [Function],
  },
  "onClick": [Function],
  "onMenuClick": [Function],
  "promptProps": undefined,
  "successors": [],
  "text": "ROOT",
}
`);
  });
});
