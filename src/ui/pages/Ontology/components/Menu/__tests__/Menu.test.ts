import { EConstant } from "../../../../../../constants";
import { checkEventual } from "../../../../../utils";
import { EMenuConstant } from "../constants";
import { composeTest } from "../root";

const throwError = () => {
  throw new Error("No view model");
};

describe("Menu", () => {
  it("create item", async () => {
    const {
      selectors: { getNodeSuccessors, getMenuItem },
    } = composeTest();

    expect(getNodeSuccessors(EConstant.Root)).toMatchInlineSnapshot(`[]`);

    const menuItem = getMenuItem(EConstant.Root, EMenuConstant.Add);

    menuItem?.onClick();

    expect(getNodeSuccessors(EConstant.Root)).toMatchInlineSnapshot(`
[
  "1",
]
`);

    menuItem?.onClick();

    expect(getNodeSuccessors(EConstant.Root)).toMatchInlineSnapshot(`
[
  "1",
  "2",
]
`);
  });

  it("should remove", async () => {
    const {
      onAppViewModelChange,
      selectors: { getNodeSuccessors, getMenuItem, getTotalItemCount },
    } = composeTest();

    const menuItem01 = getMenuItem(EConstant.Root, EMenuConstant.Add);

    menuItem01?.onClick();
    menuItem01?.onClick();

    expect(getTotalItemCount()).toMatchInlineSnapshot(`3`);

    const menuItem02 = getMenuItem("1", EMenuConstant.Remove);

    expect(menuItem02).toMatchInlineSnapshot(`
{
  "id": "Remove",
  "onClick": [Function],
  "onMenuClick": [Function],
  "text": "Remove",
}
`);

    menuItem02?.onClick();

    await checkEventual(() => getTotalItemCount() === 2, onAppViewModelChange);

    expect(getNodeSuccessors(EConstant.Root)).toMatchInlineSnapshot(`
[
  "2",
]
`);

    expect(getTotalItemCount()).toMatchInlineSnapshot(`2`);

    const menuItem03 = getMenuItem("2", EMenuConstant.Remove);

    menuItem03?.onClick();

    await checkEventual(() => getTotalItemCount() === 1, onAppViewModelChange); // NOTE: To make tests more scalable, hide the awaiting function in the root

    expect(getNodeSuccessors(EConstant.Root)).toMatchInlineSnapshot(`[]`);

    expect(getTotalItemCount()).toMatchInlineSnapshot(`1`);
  });

  it("should not remove ROOT", async () => {
    const {
      onAppViewModelChange,
      selectors: { getMenuItem, getTotalItemCount },
    } = composeTest();

    const menuItem = getMenuItem(EConstant.Root, EMenuConstant.Remove);

    expect(menuItem).toMatchInlineSnapshot(`
{
  "id": "Remove",
  "onClick": [Function],
  "onMenuClick": [Function],
  "text": "Remove",
}
`);

    menuItem?.onClick();

    await checkEventual(() => getTotalItemCount() === 1, onAppViewModelChange);

    expect(getTotalItemCount()).toMatchInlineSnapshot(`1`);
  });

  it("should edit item", async () => {
    const {
      selectors: { getNode, getMenuItem },
    } = composeTest();

    const menuItem = getMenuItem(EConstant.Root, EMenuConstant.Add);

    menuItem?.onClick();

    const menuItem02 = getMenuItem("1", EMenuConstant.Rename);

    expect(getNode("1")?.promptProps).toMatchInlineSnapshot(`undefined`);

    menuItem02?.onClick();

    expect(getNode("1")?.promptProps).toMatchInlineSnapshot(`
{
  "buttonProps": {
    "children": "Submit",
    "hasIcon": true,
    "onClick": [Function],
  },
  "description": "Enter a new name",
  "textProps": {
    "onChange": [Function],
    "placeholder": "Enter a new name",
    "value": "",
  },
  "title": "Rename",
}
`);
  });

  it("should examine item", async () => {
    const {
      onAppViewModelChange,
      selectors: { getPageType, getMenuItem, getIsLoading, getWordTree },
    } = composeTest();

    const menuItem = getMenuItem(EConstant.Root, EMenuConstant.Examine);

    expect(getPageType()).toMatchInlineSnapshot(`"Ontology"`);

    menuItem?.onClick();

    expect(getPageType()).toMatchInlineSnapshot(`"Note"`);

    await checkEventual(() => getIsLoading() === false, onAppViewModelChange);

    expect(getWordTree()).toMatchInlineSnapshot(`
{
  "childrenProps": [
    {
      "children": "Root",
      "index": 0,
      "onClick": [Function],
    },
  ],
  "id": "ROOT",
  "isCollapsible": true,
  "onClick": [Function],
  "onMenuClick": [Function],
}
`);
  });
});
