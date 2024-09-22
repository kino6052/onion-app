import { EConstant } from "../../../../../../constants";
import { checkEventual } from "../../../../../utils";
import { composeTest } from "../root";
import { EMenuConstant } from "../types";
import { getMenuItemById } from "../utils";

describe("Word Component", () => {
  it("should click on login + success", async () => {
    const { converter, onAppViewModelChange, getViewModel } = composeTest();

    const viewModel = getViewModel();

    if (!viewModel) throw new Error("No model");

    const result = converter(viewModel);

    expect(result).toMatchInlineSnapshot(`
{
  "Component": undefined,
  "childrenProps": [
    {
      "children": "Empty",
      "index": 0,
      "onClick": [Function],
    },
  ],
  "id": "ROOT",
  "isCollapsible": true,
  "onClick": [Function],
  "onMenuClick": [Function],
  "text": "Root",
}
`);
  });

  it("should collapse", () => {
    const {
      getViewModel,
      converter,
      selectors: { getIsNodeOpen },
    } = composeTest();

    const viewModel = getViewModel();

    if (!viewModel) throw new Error("No model");

    const result = converter(viewModel);

    expect(getIsNodeOpen(EConstant.Root)).toMatchInlineSnapshot(`undefined`);

    result.onClick();

    expect(getIsNodeOpen(EConstant.Root)).toMatchInlineSnapshot(`true`);

    result.onClick();

    expect(getIsNodeOpen(EConstant.Root)).toMatchInlineSnapshot(`false`);
  });

  it("should open menu", () => {
    const {
      getViewModel,
      converter,
      selectors: { getIsNodeOpen },
    } = composeTest();

    const viewModel = getViewModel();

    if (!viewModel) throw new Error("No model");

    const result = converter(viewModel);

    result.onMenuClick();

    expect(getViewModel()).toMatchInlineSnapshot(`
{
  "childrenProps": [
    {
      "children": "Empty",
      "index": 0,
      "onClick": [Function],
    },
  ],
  "id": "ROOT",
  "isCollapsible": true,
  "menuProps": {
    "id": "ROOT",
    "isOpen": false,
    "itemsProps": [
      {
        "id": "Edit",
        "onClick": [Function],
        "onMenuClick": [Function],
        "text": "Edit",
      },
      {
        "id": "Remove",
        "onClick": [Function],
        "onMenuClick": [Function],
        "text": "Remove",
      },
    ],
    "onBackgroundClick": [Function],
  },
  "onClick": [Function],
  "onMenuClick": [Function],
  "text": "Root",
}
`);
  });

  it("should open menu, click edit and get prompted", async () => {
    const {
      getViewModel,
      converter,
      selectors: { getMenuProps, getPromptProps },
      onAppViewModelChange,
    } = composeTest();

    const viewModel = getViewModel();

    if (!viewModel) throw new Error("No model");

    const result = converter(viewModel);

    result.onMenuClick();

    const menuProps = getMenuProps();

    if (!menuProps) throw new Error("No menu");

    const editMenuItem = getMenuItemById(
      EMenuConstant.Edit,
      menuProps.itemsProps
    );

    if (!editMenuItem) throw new Error("No edit item");

    editMenuItem.onClick();

    await checkEventual(
      () => getPromptProps() !== undefined,
      onAppViewModelChange
    );

    expect(getPromptProps()).toMatchInlineSnapshot(`
{
  "buttonProps": {
    "children": "Submit",
    "hasIcon": false,
    "isDisabled": true,
    "onClick": [Function],
  },
  "description": "Please provide data",
  "textProps": {
    "isDisabled": false,
    "onChange": [Function],
    "placeholder": "Value",
    "value": "Empty",
  },
  "title": "Prompt",
}
`);
  });

  it("should enter text", async () => {
    const {
      getViewModel,
      converter,
      selectors: { getMenuProps, getPromptProps },
      onAppViewModelChange,
    } = composeTest();

    const viewModel = getViewModel();

    if (!viewModel) throw new Error("No model");

    const result = converter(viewModel);

    result.onMenuClick();

    const menuProps = getMenuProps();

    if (!menuProps) throw new Error("No menu");

    const editMenuItem = getMenuItemById(
      EMenuConstant.Edit,
      menuProps.itemsProps
    );

    if (!editMenuItem) throw new Error("No edit item");

    editMenuItem.onClick();

    await checkEventual(
      () => getPromptProps() !== undefined,
      onAppViewModelChange
    );

    getPromptProps()?.textProps.onChange("This is a test");

    expect(getPromptProps()).toMatchInlineSnapshot(`
{
  "buttonProps": {
    "children": "Submit",
    "hasIcon": false,
    "isDisabled": true,
    "onClick": [Function],
  },
  "description": "Please provide data",
  "textProps": {
    "isDisabled": false,
    "onChange": [Function],
    "placeholder": "Value",
    "value": "This is a test",
  },
  "title": "Prompt",
}
`);

    getPromptProps()?.buttonProps.onClick();

    await checkEventual(
      () => getPromptProps() === undefined,
      onAppViewModelChange
    );

    expect(getViewModel()).toMatchInlineSnapshot(`
{
  "childrenProps": [
    {
      "children": "This",
      "index": 0,
      "onClick": [Function],
    },
    {
      "children": "is",
      "index": 1,
      "onClick": [Function],
    },
    {
      "children": "a",
      "index": 2,
      "onClick": [Function],
    },
    {
      "children": "test",
      "index": 3,
      "onClick": [Function],
    },
  ],
  "id": "ROOT",
  "isCollapsible": true,
  "menuProps": {
    "id": "ROOT",
    "isOpen": false,
    "itemsProps": [
      {
        "id": "Edit",
        "onClick": [Function],
        "onMenuClick": [Function],
        "text": "Edit",
      },
      {
        "id": "Remove",
        "onClick": [Function],
        "onMenuClick": [Function],
        "text": "Remove",
      },
    ],
    "onBackgroundClick": [Function],
  },
  "onClick": [Function],
  "onMenuClick": [Function],
  "promptProps": undefined,
  "text": "Root",
}
`);
  });
});
