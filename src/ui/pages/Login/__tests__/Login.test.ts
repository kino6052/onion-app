import { getViewModelSubject } from "../../../view-model/ViewModelSubject";
import { EPage } from "../../../types";
import { checkEventual } from "../../../utils";
import { getInitialOntologyTree } from "../../Ontology/utils";
import { getConverter } from "../converter";
import { getInitialLoginState } from "../utils";

beforeEach(() => {
  const subject = getViewModelSubject(); // TODO: Rename ViewModelSubject
  subject.next(getInitialLoginState());
});

describe("Login", () => {
  it("should click on login + success", async () => {
    const viewModelSubject = getViewModelSubject();
    const converter = getConverter({
      viewModelSubject,
      getErrorText: () => Promise.resolve("Error"),
      getTree: () => Promise.resolve(getInitialOntologyTree()),
      login: () =>
        Promise.resolve({
          isSuccessful: true,
          message: "Test",
        }),
    });

    const state = viewModelSubject.getValue();

    if (state.pageType !== EPage.Login) throw new Error("Not login page");

    const result = converter(state.buttonProps);

    result.onClick();

    expect(viewModelSubject.getValue()).toMatchInlineSnapshot(`
{
  "buttonProps": {
    "hasIcon": true,
    "isDisabled": true,
    "onClick": [Function],
  },
  "pageType": "Login",
}
`);

    await checkEventual((result) => {
      return result?.pageType === EPage.Ontology;
    }, viewModelSubject);

    expect(viewModelSubject.getValue()).toMatchInlineSnapshot(`
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
      "menuProps": {
        "id": "ROOT",
        "isOpen": false,
        "itemsProps": [
          {
            "id": "delete",
            "onClick": [Function],
            "onMenuClick": [Function],
            "text": "Delete",
          },
          {
            "id": "add",
            "onClick": [Function],
            "onMenuClick": [Function],
            "text": "Add New Item",
          },
        ],
        "onBackgroundClick": [Function],
      },
      "onClick": [Function],
      "onMenuClick": [Function],
      "successors": [],
      "text": "ROOT",
    },
  },
}
`);

    await checkEventual((result) => {
      if (result && result.pageType !== EPage.Ontology) return false;

      return result?.isLoading === false;
    }, viewModelSubject);

    expect(viewModelSubject.getValue()).toMatchInlineSnapshot(`
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
      "menuProps": {
        "id": "ROOT",
        "isOpen": false,
        "itemsProps": [
          {
            "id": "delete",
            "onClick": [Function],
            "onMenuClick": [Function],
            "text": "Delete",
          },
          {
            "id": "add",
            "onClick": [Function],
            "onMenuClick": [Function],
            "text": "Add New Item",
          },
        ],
        "onBackgroundClick": [Function],
      },
      "onClick": [Function],
      "onMenuClick": [Function],
      "successors": [],
      "text": "ROOT",
    },
  },
}
`);
  });

  it("should click on login + failure", async () => {
    const viewModelSubject = getViewModelSubject();
    const converter = getConverter({
      viewModelSubject,
      getErrorText: () => Promise.resolve("Error"),
      getTree: () => Promise.resolve(getInitialOntologyTree()),
      login: () =>
        Promise.resolve({
          isSuccessful: false,
          message: "Test",
        }),
    });

    const state = viewModelSubject.getValue();

    if (state.pageType !== EPage.Login) throw new Error("Not login page");

    const result = converter(state.buttonProps);

    result.onClick();

    expect(viewModelSubject.getValue()).toMatchInlineSnapshot(`
{
  "buttonProps": {
    "hasIcon": true,
    "isDisabled": true,
    "onClick": [Function],
  },
  "pageType": "Login",
}
`);

    await checkEventual((result) => {
      if (result && result.pageType !== EPage.Login) return false;

      return !!result?.message;
    }, viewModelSubject);

    expect(viewModelSubject.getValue()).toMatchInlineSnapshot(`
{
  "buttonProps": {
    "hasIcon": true,
    "isDisabled": false,
    "onClick": [Function],
  },
  "message": "Test",
  "pageType": "Login",
}
`);
  });
});
