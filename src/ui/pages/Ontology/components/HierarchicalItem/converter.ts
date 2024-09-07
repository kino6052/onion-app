import { ChangeEvent } from "react";
import { THierarchicalItemProps } from "../../../../components/Item/types";
import { TMenuProps } from "../../../../components/Menu/types";
import { EPage } from "../../../../types";
import { getUpdateState } from "../../../../utils";
import { TViewModelSubject } from "../../../../view-model/ViewModelSubject/types";
import { toggleCollapseItem } from "./actions";

type TOntologyConverter = {
  viewModelSubject: TViewModelSubject;
  getUniqueId: () => string;
  MenuComponent?: React.FC<TMenuProps>;
};

export const getConverter =
  ({ viewModelSubject, MenuComponent }: TOntologyConverter) =>
  (props: THierarchicalItemProps) => {
    const { id } = props;

    return getUpdateState(props)((_props) => {
      _props.onClick = async () => {
        viewModelSubject.next(
          getUpdateState(viewModelSubject.getValue())(toggleCollapseItem(id))
        );
      };

      _props.onMenuClick = async () => {
        viewModelSubject.next(
          getUpdateState(viewModelSubject.getValue())((_state) => {
            if (_state.pageType !== EPage.Ontology) return;

            const node = _state.tree[id];

            node.menuProps.isOpen = true;
          })
        );
      };

      _props.inputProps.onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        viewModelSubject.next(
          getUpdateState(viewModelSubject.getValue())((_state) => {
            if (_state.pageType !== EPage.Ontology) return;

            const node = _state.tree[id];

            node.text = e.target.value;
          })
        );
      };

      _props.menuProps.MenuComponent = MenuComponent;
    });
  };
