import { EMenuConstant } from "../../../../components/Menu/constants";
import { setup } from "./setup";

describe("ontologies test", () => {
  it("should have matching initial state", async () => {
    const { ontologies, composeActions, stateManager } = setup();

    const props = composeActions([
      (props) => props.pageProps.menuProps.onMenuClick?.(), // open menu
      (props) =>
        props.pageProps.menuProps.menuProps?.itemsProps
          .find((i) => i.id === EMenuConstant.Add)
          ?.onClick(), // add
    ]);

    await stateManager.waitFor((s) => s.pageState.list.length > 0);

    expect(stateManager.getState()).toMatchInlineSnapshot(`
{
  "pageState": {
    "isLoading": false,
    "isMenuOpen": false,
    "list": [
      {
        "id": "1",
        "text": "New Ontology",
      },
    ],
    "message": "",
  },
  "pageType": "Ontologies",
}
`);
    expect(ontologies).toMatchInlineSnapshot(`
{
  "1": {
    "ROOT": {
      "id": "ROOT",
      "isCollapsed": false,
      "isMenuOpen": false,
      "successors": [],
      "text": "New Ontology",
    },
  },
}
`);
  });
});
