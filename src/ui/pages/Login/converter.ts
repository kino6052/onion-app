import { TStateSubject } from "../../../services/StateSubject/types";
import { TButtonProps } from "../../components/Button/types";
import { THierarchicalItem } from "../../components/Item/types";
import { EPage, TAppProps } from "../../types";
import { findFirst, getUpdateState } from "../../utils";
import { getInitialOntologyState } from "../Ontology/utils";

type TLoginResponse = {
  isSuccessful: boolean;
  message?: string;
};

type TLoginConverter = {
  stateSubject: TStateSubject;
  login: () => Promise<TLoginResponse>;
  getTree: () => Promise<Record<string, THierarchicalItem> | undefined>;
  getErrorText: () => string;
};

export const getConverter =
  ({ stateSubject, login, getTree, getErrorText }: TLoginConverter) =>
  (props: TButtonProps) => {
    const updateProps = getUpdateState(props);

    return updateProps((_props) => {
      _props.onClick = async () => {
        const { isSuccessful, message } = await login();

        const currentState = stateSubject.getValue();

        const nextState =
          findFirst([isSuccessful && getInitialOntologyState()], undefined) ||
          getUpdateState<TAppProps>(currentState)((_state) => {
            if (_state.pageType !== EPage.Login) return;

            _state.message = message;
          });

        stateSubject.next(nextState);

        if (nextState.pageType === EPage.Ontology) {
          const tree = await getTree();

          getUpdateState(stateSubject.getValue())((_state) => {
            if (_state.pageType !== EPage.Ontology) return;

            _state.isLoading = false;

            if (!tree) {
              _state.error = getErrorText();
              return;
            }

            _state.tree = tree;
          });
        }
      };
    });
  };
