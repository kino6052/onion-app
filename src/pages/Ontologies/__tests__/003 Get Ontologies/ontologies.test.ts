import { EMenuConstant } from "../../../../components/Menu/constants";
import { EPage } from "../../../../types";
import { setup } from "./setup";

describe("ontologies test", () => {
  it("should get ontologies", async () => {
    const { ontologies, composeActions, stateManager, getOntologies } = setup();

    composeActions([
      (props) => props.pageProps.menuProps.onMenuClick?.(), // open menu
      (props) =>
        props.pageProps.menuProps.menuProps?.itemsProps
          .find((i) => i.id === EMenuConstant.Add)
          ?.onClick(), // add
    ]);

    await stateManager.waitFor((s) => s.pageState.list.length > 0);

    composeActions([
      (props) => props.pageProps.ontologiesProps[0].onClick(), // navigate
    ]);

    await stateManager.waitFor(
      (s) => s.pageType === (EPage.Ontology as string)
    );

    expect(stateManager.getState()).toMatchInlineSnapshot(`
{
  "pageState": {
    "id": "1",
    "isLoading": false,
    "name": "New Ontology",
    "tree": {
      "ROOT": {
        "id": "ROOT",
        "isCollapsed": false,
        "isMenuOpen": false,
        "successors": [],
        "text": "New Ontology",
      },
    },
  },
  "pageType": "Ontology",
}
`);

    expect(ontologies).toMatchInlineSnapshot(`
{
  "1": {
    "map": {
      "ROOT": {
        "id": "ROOT",
        "isCollapsed": false,
        "isMenuOpen": false,
        "successors": [],
        "text": "New Ontology",
      },
    },
    "name": "New Ontology",
  },
}
`);
  });
});
