import { BehaviorSubject } from "rxjs";
import { EPage, TAppProps } from "../../ui/types";

export type TStateSubject = BehaviorSubject<TAppProps<EPage>>;
