import { TButtonProps } from "../../components/Button/types";
import { THierarchicalItem } from "../../components/Item/types";
import { EPage, TAppProps } from "../../types";
import { findFirst, getUpdateState } from "../../utils";
import { TStateSubject } from "../../view-model/StateSubject/types";
import { getInitialOntologyState } from "../Ontology/utils";

type TLoginResponse = {
  isSuccessful: boolean;
  message?: string;
};

type TLoginConverter = {
  stateSubject: TStateSubject;
  login: () => Promise<TLoginResponse>;
  getTree: () => Promise<Record<string, THierarchicalItem> | undefined>;
  getErrorText: () => Promise<string>;
};

const updateOntologyState =
  ({
    tree,
    errorText,
  }: {
    tree: Record<string, THierarchicalItem> | undefined;
    errorText: string;
  }) =>
  (_state: TAppProps) => {
    if (_state.pageType !== EPage.Ontology) return;

    _state.isLoading = false;

    if (!tree) {
      _state.error = errorText;
      return;
    }

    _state.tree = tree;
  };

const updateLoginErrorState =
  ({ message }: { message: string | undefined }) =>
  (_state: TAppProps) => {
    if (_state.pageType !== EPage.Login) return;

    _state.message = message;
  };

export const getConverter =
  ({ stateSubject, login, getTree, getErrorText }: TLoginConverter) =>
  (props: TButtonProps) => {
    return getUpdateState(props)((_props) => {
      _props.onClick = async () => {
        const { isSuccessful, message } = await login();

        const currentState = stateSubject.getValue();

        const nextState =
          findFirst([isSuccessful && getInitialOntologyState()]) ||
          getUpdateState<TAppProps>(currentState)(
            updateLoginErrorState({ message })
          );

        stateSubject.next(nextState);

        if (nextState.pageType !== EPage.Ontology) return;

        const tree = await getTree();
        const errorText = await getErrorText();

        const _nextState = getUpdateState(stateSubject.getValue())(
          updateOntologyState({ tree, errorText })
        );

        stateSubject.next(_nextState);
      };
    });
  };
