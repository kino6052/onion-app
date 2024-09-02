import { TStateSubject } from "../../../services/StateSubject/types";
import { TButtonProps } from "../../components/Button/types";
import { TAppProps } from "../../types";
import { getUpdateState } from "../../utils";

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
