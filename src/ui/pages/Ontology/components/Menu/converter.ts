import { TMenuProps } from "../../../../components/Menu/types";
import { getUpdateState } from "../../../../utils";
import { TViewModelSubject } from "../../../../view-model/ViewModelSubject/types";
import { addNewItem, closeMenu, removeItem } from "./actions";

type TOntologyConverter = {
  viewModelSubject: TViewModelSubject;
  getUniqueId: () => string;
};

export const getConverter =
  ({ viewModelSubject, getUniqueId }: TOntologyConverter) =>
  (props: TMenuProps) => {
    const { id } = props;
    return getUpdateState(props)((_props) => {
      _props.onBackgroundClick = async () => {
        viewModelSubject.next(
          getUpdateState(viewModelSubject.getValue())(closeMenu(id))
        );
      };

      _props.itemsProps[0].onClick = async () => {
        viewModelSubject.next(
          getUpdateState(viewModelSubject.getValue())(removeItem({ id }))
        );
      };

      _props.itemsProps[1].onClick = async () => {
        viewModelSubject.next(
          getUpdateState(viewModelSubject.getValue())(
            addNewItem({ getUniqueId, id })
          )
        );
      };
    });
  };
