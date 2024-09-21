import { tap } from "rxjs";
import { EPage } from "../../../../types";
import { getViewModelSubject } from "../../../../view-model/ViewModelSubject";
import { getInitialOntologyState } from "../../../Ontology/utils";
import { EMenuConstant } from "./constants";
import { getConverter } from "./converter";
import { TDeserializedWord } from "../../../Note/types";
import { EConstant } from "../../../../../constants";

export const composeTest = () => {
  let counter = 1;
  const viewModelSubject = getViewModelSubject();
  viewModelSubject.next(getInitialOntologyState());
  const NoteMap: Record<string, TDeserializedWord> = {};

  const converter = getConverter({
    viewModelSubject,
    getUniqueId: () => {
      const result = `${counter}`;
      counter += 1;
      return result;
    },
    getParentId: async (id: string) => {
      const v = viewModelSubject.getValue();
      if (v.pageType !== EPage.Ontology) return undefined;
      const node = Object.values(v.tree).find((v) => v.successors.includes(id));
      return node?.id;
    },
    getNoteById: async (id: string) => {
      const note = NoteMap[id];

      if (note) return note;

      NoteMap[id] = {
        id: EConstant.Root,
        open: ["Root"],
        closed: "Root",
      };

      return NoteMap[id];
    },
  });

  const onAppViewModelChange = (cb: () => void) => {
    viewModelSubject.pipe(tap(() => cb())).subscribe();
  };

  const getViewModel = (id: string) => {
    const appViewModel = viewModelSubject.getValue();
    if (appViewModel.pageType !== EPage.Ontology) return undefined;
    return appViewModel.tree[id].menuProps;
  };

  const getNodeSuccessors = (id: string) => {
    const viewModel = viewModelSubject.getValue();

    if (viewModel.pageType !== EPage.Ontology) return undefined;

    return viewModel.tree[id].successors;
  };

  const getMenuItem = (id: string, itemId: EMenuConstant) => {
    const viewModel = getViewModel(id);

    if (!viewModel) return undefined;

    const result = converter(viewModel);

    return result.itemsProps.find(({ id }) => id === itemId);
  };

  const getTotalItemCount = () => {
    const viewModel = viewModelSubject.getValue();

    if (viewModel.pageType !== EPage.Ontology) return undefined;

    return Object.entries(viewModel.tree).length;
  };

  const getNode = (id: string) => {
    const viewModel = viewModelSubject.getValue();

    if (viewModel.pageType !== EPage.Ontology) return undefined;

    return viewModel.tree[id];
  };

  const getWordTree = () => {
    const viewModel = viewModelSubject.getValue();

    if (viewModel.pageType !== EPage.Note) return undefined;

    return viewModel.wordTreeProps;
  };

  const getIsLoading = () => {
    const viewModel = viewModelSubject.getValue();

    if (viewModel.pageType !== EPage.Note) return false;

    return viewModel.isLoading;
  };

  const getPageType = () => {
    const viewModel = viewModelSubject.getValue();

    return viewModel.pageType;
  };

  return {
    onAppViewModelChange,
    getViewModel,
    converter,
    selectors: {
      getNodeSuccessors,
      getMenuItem,
      getTotalItemCount,
      getNode,
      getPageType,
      getWordTree,
      getIsLoading,
    },
  };
};
