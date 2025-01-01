import { tap } from "rxjs";
import { EPage } from "../../../../types";
import { getUpdateState } from "../../../../utils";
import { getViewModelSubject } from "../../../../view-model/ViewModelSubject";
import { DEFAULT_DATA, getInitialNoteState } from "../../utils";
import { deserializeNote, findNotePropsById } from "../../utils/tree";
import { getConverter } from "./converter";
import { TSerializedWord } from "../../types";

const NoteService = {
  notes: DEFAULT_DATA,
};

export const composeTest = () => {
  getViewModelSubject().next(getInitialNoteState(NoteService.notes));
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
    getSerializedWord: async (id: string) => {
      return NoteService.notes[id];
    },
    updateSerializedWord: async (word: TSerializedWord) => {
      NoteService.notes[word.id] = word;

      return deserializeNote(word, NoteService.notes);
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

  const getMenuProps = () => {
    const vm = getViewModel();

    return vm?.menuProps;
  };

  const getPromptProps = () => {
    const vm = getViewModel();

    return vm?.promptProps;
  };

  return {
    onAppViewModelChange,
    getViewModel,
    converter,
    selectors: {
      getIsNodeOpen,
      getMenuProps,
      getPromptProps,
    },
  };
};
