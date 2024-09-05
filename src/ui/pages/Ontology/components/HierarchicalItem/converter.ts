import { THierarchicalItemProps } from "../../../../components/Item/types";
import { EPage } from "../../../../types";
import { getUpdateState } from "../../../../utils";
import { TStateSubject } from "../../../../view-model/StateSubject/types";
import { addNewItem, toggleCollapseItem } from "./actions";

type TOntologyConverter = {
  stateSubject: TStateSubject;
  getUniqueId: () => string;
};

export const getConverter =
  ({ stateSubject, getUniqueId }: TOntologyConverter) =>
  (props: THierarchicalItemProps) => {
    const { id } = props;

    return getUpdateState(props)((_props) => {
      _props.onClick = async () => {
        stateSubject.next(
          getUpdateState(stateSubject.getValue())(toggleCollapseItem(id))
        );
      };

      _props.onMenuClick = async () => {
        stateSubject.next(
          getUpdateState(stateSubject.getValue())((_state) => {
            if (_state.pageType !== EPage.Ontology) return;

            const node = _state.tree[id];

            node.menuProps.isOpen = true;
          })
        );
      };
    });
  };
