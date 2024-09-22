import { tap } from "rxjs";
import { EPage } from "../../../../types";
import { getUpdateState } from "../../../../utils";
import { getViewModelSubject } from "../../../../view-model/ViewModelSubject";
import { getInitialNoteState } from "../../utils";
import { findNotePropsById } from "../../utils/tree";
import { getConverter } from "./converter";

export const composeTest = () => {
  getViewModelSubject().next(getInitialNoteState());
  const viewModelSubject = getViewModelSubject();

  const converter = getConverter({
    toggleCollapse: (id: string) => {
      const state = viewModelSubject.getValue();

      viewModelSubject.next(
        getUpdateState(state)((_state) => {
          if (_state.pageType !== EPage.Note) return;

          const props = findNotePropsById(id, _state.wordTreeProps);

          if (!props) return;

          props.isOpen = !props.isOpen;
        })
      );
    },
  });

  const onAppViewModelChange = (cb: () => void) => {
    viewModelSubject.pipe(tap(() => cb())).subscribe();
  };

  const getViewModel = () => {
    const appViewModel = viewModelSubject.getValue();
    if (appViewModel.pageType !== EPage.Note) return undefined;
    return appViewModel.wordTreeProps;
  };

  const getIsNodeOpen = (id: string) => {
    const tree = getViewModel();

    if (!tree) return;

    return findNotePropsById(id, tree)?.isOpen;
  };

  return {
    onAppViewModelChange,
    getViewModel,
    converter,
    selectors: {
      getIsNodeOpen,
    },
  };
};
