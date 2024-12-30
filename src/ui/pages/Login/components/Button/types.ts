import { TButtonProps } from "../../../../components/Button/types";
import { TAppState, TSetState } from "../../../../types";

export type TMapStateToButtonProps = (
  state: TAppState,
  setState: TSetState<TAppState>
) => TButtonProps;
