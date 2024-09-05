import { TButtonProps } from "../../components/Button/types";
import { THierarchicalItem } from "../../components/Item/types";
import { EPage, TAppProps } from "../../types";
import { findFirst, getUpdateState } from "../../utils";
import { TStateSubject } from "../../view-model/StateSubject/types";
import { getInitialOntologyState } from "../Ontology/utils";
import { updateLoginErrorState, updateOntologyState } from "./logic";

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
