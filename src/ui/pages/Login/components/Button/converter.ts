import { TButtonProps } from "../../../../components/Button/types";
import { THierarchicalItem } from "../../../../components/Item/types";
import { EPage, TAppProps } from "../../../../types";
import { findFirst, getUpdateState } from "../../../../utils";
import { TViewModelSubject } from "../../../../view-model/ViewModelSubject/types";
import { getInitialOntologyState } from "../../../Ontology/utils";
import {
  getDisabledButtonState,
  updateLoginErrorState,
  updateOntologyState,
} from "./actions";

type TLoginResponse = {
  isSuccessful: boolean;
  message?: string;
};

type TLoginConverter = {
  viewModelSubject: TViewModelSubject;
  login: () => Promise<TLoginResponse>;
  getTree: () => Promise<Record<string, THierarchicalItem> | undefined>;
  getErrorText: () => Promise<string>;
};

// TODO: converter should not know about the subject
// Only should know getViewModel for the current component + onClick and so on.
// Because converter is the DI thing, it is better to keep it on high level of abstraction
export const getConverter =
  ({ viewModelSubject, login, getTree, getErrorText }: TLoginConverter) =>
  (props: TButtonProps) => {
    return getUpdateState(props)((_props) => {
      _props.onClick = async () => {
        viewModelSubject.next(
          getUpdateState(viewModelSubject.getValue())(
            getDisabledButtonState(true)
          )
        );

        try {
          const { isSuccessful, message } = await login();

          const nextState =
            findFirst([isSuccessful && getInitialOntologyState()]) ||
            getUpdateState<TAppProps>(viewModelSubject.getValue())(
              updateLoginErrorState({ message })
            );

          viewModelSubject.next(nextState);

          if (nextState.pageType !== EPage.Ontology) return;

          const tree = await getTree();
          const errorText = await getErrorText();

          const _nextState = getUpdateState(viewModelSubject.getValue())(
            updateOntologyState({ tree, errorText })
          );

          viewModelSubject.next(_nextState);
        } finally {
          viewModelSubject.next(
            getUpdateState(viewModelSubject.getValue())(
              getDisabledButtonState(false)
            )
          );
        }
      };
    });
  };
