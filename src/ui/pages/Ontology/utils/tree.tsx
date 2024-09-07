import { EConstant } from "../../../../constants";
import { HierarchicalItem } from "../../../components/Item";
import { THierarchicalItemProps } from "../../../components/Item/types";
import { noop } from "../../../utils";

export const composeTree = ({
  items,
  id = EConstant.Root,
  indent = 0,
  ItemComponent = HierarchicalItem,
}: {
  items: Record<string, THierarchicalItemProps>;
  id?: string;
  indent?: number;
  ItemComponent?: React.FC<THierarchicalItemProps>;
}) => {
  const item = items[id];

  if (!item) return null;

  return (
    <ItemComponent {...item} onClick={noop} onMenuClick={noop} id={id}>
      {!item.isCollapsed &&
        item.successors.map((_id) => {
          const C = composeTree({
            items,
            id: _id,
            indent: indent + 1,
            ItemComponent,
          });

          return <span key={_id}>{C}</span>;
        })}
    </ItemComponent>
  );
};
