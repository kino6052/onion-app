import { uniqueId } from "lodash";
import { EConstant } from "../../../../constants";
import { EPage } from "../../../types";
import { noop } from "../../../utils";
import { getViewModelSubject } from "../../../view-model/ViewModelSubject";
import { getConverter } from "../components/HierarchicalItem/converter";
import { getInitialOntologyState } from "../utils";

beforeEach(() => {
  const subject = getViewModelSubject();
  subject.next(getInitialOntologyState());
});

describe("Ontology", () => {
  it("should uncollapse", async () => {
    const viewModelSubject = getViewModelSubject();
    const converter = getConverter({
      viewModelSubject,
      getUniqueId: uniqueId,
    });

    const state = viewModelSubject.getValue();

    if (state.pageType !== EPage.Ontology) throw new Error("Not login page");

    const result = converter({
      ...state.tree[EConstant.Root],
      onClick: noop,
      onMenuClick: noop,
    });

    result.onClick();

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
      "isCollapsed": true,
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

  it("should create new item", async () => {
    const viewModelSubject = getViewModelSubject();
    const converter = getConverter({
      viewModelSubject,
      getUniqueId: uniqueId,
    });

    const state = viewModelSubject.getValue();

    if (state.pageType !== EPage.Ontology) throw new Error("Not login page");

    const result = converter({
      ...state.tree[EConstant.Root],
      onClick: noop,
      onMenuClick: noop,
    });

    result.onMenuClick();

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
        "isOpen": true,
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
});
