export const getComposeActions =
  <TProps>(getProps: () => TProps) =>
  (actions: ((props: TProps) => void)[]): TProps | undefined => {
    return actions.reduce(
      (_: TProps | undefined, action) => {
        action(getProps());

        return getProps();
      },
      undefined satisfies TProps | undefined
    );
  };
