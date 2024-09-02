import { produce } from "immer";
import { TStateSubject } from "../../../services/StateSubject/types";
import { TButtonProps } from "../../components/Button/types";
import { TAppProps } from "../../types";

function getUpdateState<T extends Record<string, unknown>>(state: T) {
  return (converter: (state: T) => void) => produce(state, converter);
}

export const getConverter =
  ({ stateSubject }: { stateSubject: TStateSubject }) =>
  (props: TButtonProps) => {
    const updateProps = getUpdateState(props);

    return updateProps((_props) => {
      _props.onClick = () => {
        stateSubject.next(
          getUpdateState<TAppProps>(stateSubject.getValue())((_state) => {
            _state.pageProps.buttonProps.children = "Test";
          })
        );
      };
    });
  };
