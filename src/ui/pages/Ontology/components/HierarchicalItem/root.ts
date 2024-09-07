import { uniqueId } from "lodash";
import { tap } from "rxjs";
import { EPage } from "../../../../types";
import { getViewModelSubject } from "../../../../view-model/ViewModelSubject";
import { getInitialOntologyState } from "../../../Ontology/utils";
import { getConverter } from "./converter";

export const composeTest = () => {
  getViewModelSubject().next(getInitialOntologyState());
  const viewModelSubject = getViewModelSubject();

  const converter = getConverter({
    viewModelSubject,
    getUniqueId: uniqueId,
  });

  const onAppViewModelChange = (cb: () => void) => {
    viewModelSubject.pipe(tap(() => cb())).subscribe();
  };

  const getViewModel = (id: string) => {
    const appViewModel = viewModelSubject.getValue();
    if (appViewModel.pageType !== EPage.Ontology) return undefined;
    return appViewModel.tree[id];
  };

  const getIsCollapsed = (id: string) => {
    const viewModel = getViewModel(id);
    return viewModel?.isCollapsed;
  };

  const getIsMenuOpen = (id: string) => {
    const viewModel = getViewModel(id);
    return viewModel?.menuProps.isOpen;
  };

  return {
    onAppViewModelChange,
    getViewModel,
    converter,
    selectors: {
      getIsCollapsed,
      getIsMenuOpen,
    },
  };
};
