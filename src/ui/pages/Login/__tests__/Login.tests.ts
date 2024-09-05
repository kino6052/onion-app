import { getStateSubject } from "../../../view-model/StateSubject";
import { EPage } from "../../../types";
import { checkEventual } from "../../../utils";
import { getInitialOntologyTree } from "../../Ontology/utils";
import { getConverter } from "../converter";

describe("Login", () => {
  it("should click on login + success", async () => {
    const stateSubject = getStateSubject();
    const converter = getConverter({
      stateSubject,
      getErrorText: () => Promise.resolve("Error"),
      getTree: () => Promise.resolve(getInitialOntologyTree()),
      login: () =>
        Promise.resolve({
          isSuccessful: true,
          message: "Test",
        }),
    });

    const state = stateSubject.getValue();

    if (state.pageType !== EPage.Login) throw new Error("Not login page");

    const result = converter(state.buttonProps);

    result.onClick();

    await checkEventual((result) => {
      return result?.pageType === EPage.Ontology;
    }, stateSubject);

    expect(stateSubject.getValue()).toMatchInlineSnapshot(`
{
  "isLoading": true,
  "menuProps": {
    "id": "menu",
    "onClick": [Function],
    "onMenuClick": [Function],
    "text": "Menu",
  },
  "pageType": "Ontology",
  "tree": {
    "ROOT": {
      "id": "ROOT",
      "indent": 0,
      "isCollapsed": false,
      "successors": [],
      "text": "ROOT",
    },
  },
}
`);

    await checkEventual((result) => {
      if (result && result.pageType !== EPage.Ontology) return false;

      return result?.isLoading === false;
    }, stateSubject);

    expect(stateSubject.getValue()).toMatchInlineSnapshot(`
{
  "isLoading": false,
  "menuProps": {
    "id": "menu",
    "onClick": [Function],
    "onMenuClick": [Function],
    "text": "Menu",
  },
  "pageType": "Ontology",
  "tree": {
    "ROOT": {
      "id": "ROOT",
      "indent": 0,
      "isCollapsed": false,
      "successors": [],
      "text": "ROOT",
    },
  },
}
`);
  });
});
