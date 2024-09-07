import { ChangeEvent } from "react";
import { EConstant } from "../../../../../../constants";
import { composeTest } from "../root";

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
    const { converter, getViewModel } = composeTest();

    const result = converter(getViewModel(EConstant.Root) ?? throwError());

    expect(result.text).toMatchInlineSnapshot(`"ROOT"`);

    result.inputProps.onChange?.({
      target: {
        value: "123",
      },
    } as ChangeEvent<HTMLInputElement>);

    const result01 = converter(getViewModel(EConstant.Root) ?? throwError());

    expect(result01.text).toMatchInlineSnapshot(`"123"`);
  });
});
