import { ChangeEvent } from "react";
import { EConstant } from "../../../../../../constants";
import { composeTest } from "../root";
import { getInitialRenamePromptProps } from "../utils";

const throwError = () => {
  throw new Error("No view model");
};

describe("Hierarchical Item", () => {
  it("should uncollapse", async () => {
    const {
      converter,
      getViewModel,
      selectors: { getIsCollapsed },
    } = composeTest();

    const result = converter(getViewModel(EConstant.Root) ?? throwError());

    expect(getIsCollapsed(EConstant.Root)).toMatchInlineSnapshot(`false`);

    result.onClick();

    expect(getIsCollapsed(EConstant.Root)).toMatchInlineSnapshot(`true`);
  });

  it("should open menu", async () => {
    const {
      converter,
      getViewModel,
      selectors: { getIsMenuOpen },
    } = composeTest();

    const result = converter(getViewModel(EConstant.Root) ?? throwError());

    expect(getIsMenuOpen(EConstant.Root)).toMatchInlineSnapshot(`false`);

    result.onMenuClick();

    expect(getIsMenuOpen(EConstant.Root)).toMatchInlineSnapshot(`true`);
  });

  it("should edit name", async () => {
    const {
      converter,
      getViewModel,
      selectors: { getPromptProps },
    } = composeTest();

    const viewModel = getViewModel(EConstant.Root) ?? throwError();
    viewModel.promptProps = getInitialRenamePromptProps();

    const result = converter(getViewModel(EConstant.Root) ?? throwError());

    expect(result.text).toMatchInlineSnapshot(`"ROOT"`);

    result.promptProps?.textProps.onChange({
      target: {
        value: "123",
      },
    } as ChangeEvent<HTMLInputElement>);

    expect(getPromptProps(EConstant.Root)).toMatchInlineSnapshot(`
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
    "value": "123",
  },
  "title": "Rename",
}
`);

    result.promptProps?.buttonProps.onClick();

    expect(getPromptProps(EConstant.Root)).toMatchInlineSnapshot(`undefined`);
  });
});
