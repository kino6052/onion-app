import { PropsWithChildren } from "../../libs/react";
import { TWithHandlers } from "../../pages/Note/withRange/types";

export type TIsSelected = { isSelected: boolean };

export type TTextProps = PropsWithChildren<
  Partial<TIsSelected> & TWithHandlers
>;
