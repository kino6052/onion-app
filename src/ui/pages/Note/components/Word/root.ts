import { tap } from "rxjs";
import { EPage } from "../../../../types";
import { getViewModelSubject } from "../../../../view-model/ViewModelSubject";
import { getInitialNoteState } from "../../utils";
import { getConverter } from "./converter";

export const composeTest = () => {
  getViewModelSubject().next(getInitialNoteState());
  const viewModelSubject = getViewModelSubject();

  const converter = getConverter({});

  const onAppViewModelChange = (cb: () => void) => {
    viewModelSubject.pipe(tap(() => cb())).subscribe();
  };

  const getViewModel = () => {
    const appViewModel = viewModelSubject.getValue();
    if (appViewModel.pageType !== EPage.Note) return undefined;
    return appViewModel.wordTreeProps;
  };

  return {
    onAppViewModelChange,
    getViewModel,
    converter,
  };
};
