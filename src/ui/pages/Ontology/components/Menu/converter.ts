import { TMenuProps } from "../../../../components/Menu/types";
import { getUpdateState } from "../../../../utils";
import { TStateSubject } from "../../../../view-model/StateSubject/types";
import { addNewItem, closeMenu, removeItem } from "./actions";

type TOntologyConverter = {
  stateSubject: TStateSubject;
  getUniqueId: () => string;
};

export const getConverter =
  ({ stateSubject, getUniqueId }: TOntologyConverter) =>
  (props: TMenuProps) => {
    const { id } = props;
    return getUpdateState(props)((_props) => {
      _props.onBackgroundClick = async () => {
        stateSubject.next(
          getUpdateState(stateSubject.getValue())(closeMenu(id))
        );
      };

      _props.itemsProps[0].onClick = async () => {
        stateSubject.next(
          getUpdateState(stateSubject.getValue())(removeItem({ id }))
        );
      };

      _props.itemsProps[1].onClick = async () => {
        stateSubject.next(
          getUpdateState(stateSubject.getValue())(
            addNewItem({ getUniqueId, id })
          )
        );
      };
    });
  };
