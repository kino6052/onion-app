import { BehaviorSubject } from "rxjs";
import { DEFAULT_STATE } from "../../pages/Login/data";
import { TGetStateManager } from "./types";
import { TAppState } from "../../types";

const $state = new BehaviorSubject<TAppState>(DEFAULT_STATE);

export const getStateManager: TGetStateManager = () => {
  return {
    getState: () => $state.getValue(),
    setState: (cb) => $state.next(cb($state.getValue())),
    subscribe: (callback) => {
      const subscription = $state.subscribe(callback);
      return () => subscription.unsubscribe();
    },
  };
};
