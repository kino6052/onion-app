import { TWordProps } from "../../../../components/Word/types";
import { FC } from "../../../../libs/react";

export const getConverter =
  ({ getComponent }: { getComponent?: () => FC<TWordProps> }) =>
  (input: TWordProps) => {
    return {
      ...input,
      Component: getComponent?.(),
    } as TWordProps;
  };
