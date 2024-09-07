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
});
