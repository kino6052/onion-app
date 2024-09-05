import { uniqueId } from "lodash";
import { EPage } from "../../../types";
import { checkEventual, noop } from "../../../utils";
import { getStateSubject } from "../../../view-model/StateSubject";
import { getConverter } from "../components/HierarchicalItem/converter";
import { getInitialOntologyState, getInitialOntologyTree } from "../utils";
import { EConstant } from "../../../../constants";

beforeEach(() => {
  const subject = getStateSubject();
  subject.next(getInitialOntologyState());
});

describe("Ontology", () => {
  it("should uncollapse", async () => {
    const stateSubject = getStateSubject();
    const converter = getConverter({
      stateSubject,
      getUniqueId: uniqueId,
    });

    const state = stateSubject.getValue();

    if (state.pageType !== EPage.Ontology) throw new Error("Not login page");

    const result = converter({
      ...state.tree[EConstant.Root],
      onClick: noop,
      onMenuClick: noop,
    });

    result.onClick();

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
      "isCollapsed": true,
      "successors": [],
      "text": "ROOT",
    },
  },
}
`);
  });

  it("should create new item", async () => {
    const stateSubject = getStateSubject();
    const converter = getConverter({
      stateSubject,
      getUniqueId: uniqueId,
    });

    const state = stateSubject.getValue();

    if (state.pageType !== EPage.Ontology) throw new Error("Not login page");

    const result = converter({
      ...state.tree[EConstant.Root],
      onClick: noop,
      onMenuClick: noop,
    });

    result.onMenuClick();

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
    "1": {
      "id": "1",
      "indent": 1,
      "isCollapsed": false,
      "successors": [],
      "text": "New Item",
    },
    "ROOT": {
      "id": "ROOT",
      "indent": 0,
      "isCollapsed": false,
      "successors": [
        "1",
      ],
      "text": "ROOT",
    },
  },
}
`);
  });
});
