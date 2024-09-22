import { EConstant } from "../../../../../../constants";
import { composeTest } from "../root";

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

    expect(getViewModel()).toMatchInlineSnapshot();
  });
});
