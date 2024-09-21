import { composeTest } from "../root";

describe("Word Component", () => {
  it("should click on login + success", async () => {
    const { converter, onAppViewModelChange, getViewModel } = composeTest();

    const result = converter(
      getViewModel() ??
        (() => {
          throw new Error("No view model");
        })()
    );

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
}
`);
  });
});
