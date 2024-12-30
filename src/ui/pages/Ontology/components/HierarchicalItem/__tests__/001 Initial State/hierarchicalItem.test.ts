import { setup } from "./setup";

describe("Hierarchical Item", () => {
  it("should have an initial props", () => {
    const { mapStateToButtonProps, stateManager } = setup();

    expect(
      mapStateToButtonProps(
        stateManager.getState(),
        stateManager.setState.bind(stateManager)
      )
    ).toMatchSnapshot();
  });
});
