import { EPage } from "../../../../../types";
import { checkEventual } from "../../../../../utils";
import { composeTest } from "../root";

describe("Login Button", () => {
  it("should click on login + success", async () => {
    const {
      converter,
      onAppViewModelChange,
      getViewModel,
      selectors: { getPageType, getIsLoading },
    } = composeTest({ isErrorScenario: false });

    const result = converter(
      getViewModel() ??
        (() => {
          throw new Error("No view model");
        })()
    );

    result.onClick();

    expect(getViewModel()).toMatchInlineSnapshot(`
{
  "hasIcon": true,
  "isDisabled": true,
  "onClick": [Function],
}
`);
    expect(getPageType()).toMatchInlineSnapshot(`"Login"`);

    await checkEventual(
      () => getPageType() === EPage.Ontology,
      onAppViewModelChange
    );

    expect(getPageType()).toMatchInlineSnapshot(`"Ontology"`);
    expect(getIsLoading()).toMatchInlineSnapshot(`true`);

    await checkEventual(() => getIsLoading() === false, onAppViewModelChange);

    expect(getIsLoading()).toMatchInlineSnapshot(`false`);
  });

  it("should click on login + failure", async () => {
    const {
      converter,
      onAppViewModelChange,
      getViewModel,
      selectors: { getMessage },
    } = composeTest({ isErrorScenario: true });

    const result = converter(
      getViewModel() ??
        (() => {
          throw new Error("No view model");
        })()
    );

    result.onClick();

    expect(getViewModel()).toMatchInlineSnapshot(`
{
  "hasIcon": true,
  "isDisabled": true,
  "onClick": [Function],
}
`);

    await checkEventual(() => !!getMessage(), onAppViewModelChange);

    expect(getMessage()).toMatchInlineSnapshot(`"Test"`);

    expect(getViewModel()).toMatchInlineSnapshot(`
{
  "hasIcon": true,
  "isDisabled": false,
  "onClick": [Function],
}
`);
  });
});
