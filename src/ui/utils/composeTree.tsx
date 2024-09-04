import { EConstant } from "../../constants";
import { HierarchicalItem } from "../components/Item";
import { THierarchicalItemProps } from "../components/Item/types";

export const composeTree = (
  items: Record<string, THierarchicalItemProps>,
  id: string = EConstant.Root,
  indent = 0
) => {
  const item = items[id];

  if (!item) return null;

  return (
    <HierarchicalItem {...item} id={id}>
      {!item.isCollapsed &&
        item.successors.map((_id) => {
          const C = composeTree(items, _id, indent + 1);

          return <span key={_id}>{C}</span>;
        })}
    </HierarchicalItem>
  );
};
