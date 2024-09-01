import { TItemProps } from "./components/Item/types";
import { EConstant } from "./constants";
import { Item } from "./components/Item";

export const composeTree = (
  items: Record<string, TItemProps>,
  id: string = EConstant.Root,
  indent = 0
) => {
  const item = items[id];

  if (!item) return null;

  return (
    <Item id={id} text={item.text} indent={indent} onClick={item.onClick}>
      {!item.isCollapsed &&
        item.successors.map((_id) => {
          const C = composeTree(items, _id, indent + 1);

          return <span key={_id}>{C}</span>;
        })}
    </Item>
  );
};

export function findFirst<T extends unknown>(arr: T[]) {
  return arr.find(Boolean) as T | undefined;
}
