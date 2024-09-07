import { EConstant } from "../../../../../constants";
import { TMenuProps } from "../../../../components/Menu/types";
import { getUpdateState } from "../../../../utils";
import { TViewModelSubject } from "../../../../view-model/ViewModelSubject/types";
import { addNewItem, closeMenu, removeItem, renameItem } from "./actions";
import { EMenuConstant } from "./constants";
import { getMenuItemById } from "./utils";

type TOntologyConverter = {
  viewModelSubject: TViewModelSubject;
  getUniqueId: () => string;
  getParentId: (id: string) => Promise<string | undefined>;
};

export const getConverter =
  ({ viewModelSubject, getUniqueId, getParentId }: TOntologyConverter) =>
  (props: TMenuProps) => {
    const { id } = props;
    return getUpdateState(props)((_props) => {
      _props.onBackgroundClick = async () => {
        viewModelSubject.next(
          getUpdateState(viewModelSubject.getValue())(closeMenu(id))
        );
      };

      const menuItem01 = getMenuItemById(
        EMenuConstant.Remove,
        _props.itemsProps
      );

      menuItem01 &&
        (menuItem01.onClick = async () => {
          const parentId = await getParentId(id);
          viewModelSubject.next(
            getUpdateState(viewModelSubject.getValue())(
              removeItem({ id, parentId })
            )
          );
        });

      const menuItem02 = getMenuItemById(EMenuConstant.Add, _props.itemsProps);

      menuItem02 &&
        (menuItem02.onClick = async () => {
          viewModelSubject.next(
            getUpdateState(viewModelSubject.getValue())(
              addNewItem({ getUniqueId, id })
            )
          );
        });

      const menuItem03 = getMenuItemById(
        EMenuConstant.Rename,
        _props.itemsProps
      );

      menuItem03 &&
        (menuItem03.onClick = async () => {
          viewModelSubject.next(
            getUpdateState(viewModelSubject.getValue())(renameItem({ id }))
          );
        });
    });
  };
