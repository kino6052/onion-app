import { BehaviorSubject } from "rxjs";
import { getInitialLoginState } from "../../ui/pages/Login/utils";
import { TAppProps } from "../../ui/types";
import { TStateSubject } from "./types";

export const stateSubject: TStateSubject = new BehaviorSubject<TAppProps>(
  getInitialLoginState()
);
