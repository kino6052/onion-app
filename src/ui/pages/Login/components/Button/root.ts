import { tap } from "rxjs";
import { EPage } from "../../../../types";
import { getViewModelSubject } from "../../../../view-model/ViewModelSubject";
import { getInitialOntologyTree } from "../../../Ontology/utils";
import { getConverter } from "./converter";
import { getInitialLoginState } from "../../utils";
import { findFirst } from "../../../../utils";

export const composeTest = ({
  isErrorScenario,
}: {
  isErrorScenario?: boolean;
}) => {
  getViewModelSubject().next(getInitialLoginState());
  const viewModelSubject = getViewModelSubject();
  const converter = getConverter({
    viewModelSubject,
    getErrorText: () => Promise.resolve("Error"),
    getTree: () => Promise.resolve(getInitialOntologyTree()),
    login: () =>
      Promise.resolve(
        findFirst([
          !!isErrorScenario && { isSuccessful: false, message: "Test" },
          {
            isSuccessful: true,
            message: "Test",
          },
        ])
      ),
  });

  const onAppViewModelChange = (cb: () => void) => {
    viewModelSubject.pipe(tap(() => cb())).subscribe();
  };

  const getViewModel = () => {
    const appViewModel = viewModelSubject.getValue();
    if (appViewModel.pageType !== EPage.Login) return undefined;
    return appViewModel.buttonProps;
  };

  const getPageType = () => viewModelSubject.getValue().pageType;

  const getIsLoading = () => {
    const viewModel = viewModelSubject.getValue();
    if (viewModel.pageType !== EPage.Ontology) return false;
    return viewModel.isLoading;
  };

  const getMessage = () => {
    const appViewModel = viewModelSubject.getValue();
    if (appViewModel.pageType !== EPage.Login) return undefined;
    return appViewModel.message;
  };

  return {
    onAppViewModelChange,
    getViewModel,
    converter,
    selectors: {
      getPageType,
      getIsLoading,
      getMessage,
    },
  };
};
