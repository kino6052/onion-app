import { BehaviorSubject } from "rxjs";
import { getInitialLoginState } from "../../pages/Login/utils";
import { TAppProps } from "../../types";
import { TViewModelSubject } from "./types";

export const viewModelSubject: TViewModelSubject =
  new BehaviorSubject<TAppProps>(getInitialLoginState());
