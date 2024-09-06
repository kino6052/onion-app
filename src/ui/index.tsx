import compose from "compose-function";
import { App as _App } from "./App";
import { withState } from "./utils/withState";
import { getViewModelSubject } from "./view-model/ViewModelSubject";
import { tap } from "rxjs";

const viewModelSubject = getViewModelSubject();

export const App = compose(withState(viewModelSubject))(_App);

viewModelSubject.pipe(tap(console.warn)).subscribe();
