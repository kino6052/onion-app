import { EMenuConstant } from "../../../../components/Menu/constants";
import { EPage } from "../../../../../types";
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

    await stateManager.waitFor((s) => s.pageState.list.length === 1);

    composeActions([
      (props) => props.pageProps.menuProps.onMenuClick?.(), // open menu
      (props) =>
        props.pageProps.menuProps.menuProps?.itemsProps
          .find((i) => i.id === EMenuConstant.Add)
          ?.onClick(), // add
    ]);

    await stateManager.waitFor((s) => s.pageState.list.length === 2);

    // composeActions([
    //   (props) => props.pageProps.ontologiesProps[0].onClick(), // navigate
    // ]);

    // await stateManager.waitFor(
    //   (s) => s.pageType === (EPage.Ontology as string)
    // );

    expect(stateManager.getState()).toMatchInlineSnapshot(`
{
  "pageState": {
    "id": "id",
    "isLoading": false,
    "isMenuOpen": false,
    "list": [
      {
        "id": "1",
        "text": "New Ontology",
      },
      {
        "id": "2",
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
  "2": {
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
