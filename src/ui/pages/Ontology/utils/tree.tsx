import { EConstant } from "../../../../constants";
import { THierarchicalItem } from "../../../components/Item/types";
import { noop } from "../../../utils";
import { HierarchicalItem } from "../components/HierarchicalItem";

export const composeTree = (
  items: Record<string, THierarchicalItem>,
  id: string = EConstant.Root,
  indent = 0
) => {
  const item = items[id];

  if (!item) return null;

  return (
    <HierarchicalItem {...item} onClick={noop} onMenuClick={noop} id={id}>
      {!item.isCollapsed &&
        item.successors.map((_id) => {
          const C = composeTree(items, _id, indent + 1);

          return <span key={_id}>{C}</span>;
        })}
    </HierarchicalItem>
  );
};
