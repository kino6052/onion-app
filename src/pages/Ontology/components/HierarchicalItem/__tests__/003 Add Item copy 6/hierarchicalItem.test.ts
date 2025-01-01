import { EPage } from "../../../../../../types";
import { setup } from "./setup";

describe("Hierarchical Item", () => {
  it("should examine item", async () => {
    const { stateManager, composeActions } = setup();

    const props = composeActions([
      // 1. Open menu on Root
      (props) => props?.onMenuClick?.(),

      // 2. Select "Examine" from menu on Root
      (props) =>
        props?.menuProps?.itemsProps
          .find(({ id }) => id.toLowerCase().includes("examine"))
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
        "isMenuOpen": true,
        "successors": [],
        "text": "ROOT",
      },
    },
  },
  "pageType": "Ontology",
}
`);

    await stateManager.waitFor((state) => state.pageType === EPage.Note);

    expect(stateManager.getState()).toMatchInlineSnapshot(`
{
  "pageState": {
    "id": "ROOT",
    "isLoading": false,
    "wordTree": {
      "ROOT": {
        "closed": "Root",
        "id": "ROOT",
        "isCollapsed": false,
        "open": "This is {{id1}}! However, {{id2}} is {{id3}}.",
      },
    },
  },
  "pageType": "Note",
}
`);
  });
});
