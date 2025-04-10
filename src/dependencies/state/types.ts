import { TAppState } from "../../types";

export type TGetStateManager = () => {
  getState: () => TAppState;
  setState: (cb: (state: TAppState) => TAppState) => void;
  subscribe: (callback: (state: TAppState) => void) => () => void;
};
