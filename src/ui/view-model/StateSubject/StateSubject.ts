import { BehaviorSubject } from "rxjs";
import { getInitialLoginState } from "../../pages/Login/utils";
import { TAppProps } from "../../types";
import { TStateSubject } from "./types";

export const stateSubject: TStateSubject = new BehaviorSubject<TAppProps>(
  getInitialLoginState()
);
