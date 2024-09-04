import { TStateSubject } from "../../../services/StateSubject/types";
import { TButtonProps } from "../../components/Button/types";
import { EPage, TAppProps } from "../../types";
import { getUpdateState } from "../../utils";

export const getConverter =
  ({ stateSubject }: { stateSubject: TStateSubject }) =>
  (props: TButtonProps) => {
    const updateProps = getUpdateState(props);

    return updateProps((_props) => {
      _props.onClick = () => {
        const currentState = stateSubject.getValue();
        const nextState = getUpdateState<TAppProps>(currentState)((_state) => {
          if (_state.pageType !== EPage.Login) return;

          _state.buttonProps.children = "Test";
        });

        stateSubject.next(nextState);
      };
    });
  };
