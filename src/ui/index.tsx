import compose from "compose-function";
import { App as _App } from "./App";
import { withState } from "./utils/withState";
import { getStateSubject } from "./view-model/StateSubject";
import { tap } from "rxjs";

const stateSubject = getStateSubject();

export const App = compose(withState(stateSubject))(_App);

stateSubject.pipe(tap(console.warn)).subscribe();
