import { EPage, TAppProps } from "../../../../types";
import { mapTreeToTreeProps } from "../../utils";

export const toggleCollapseItem = (id: string) => (_state: TAppProps) => {
  if (_state.pageType !== EPage.Ontology) return;
  const node = _state.tree[id];
  const isCollapsed = node.isCollapsed;
  node.isCollapsed = !isCollapsed;
};

export const addNewItem =
  ({ getUniqueId, id }: { getUniqueId: () => string; id: string }) =>
  (_state: TAppProps) => {
    if (_state.pageType !== EPage.Ontology) return;
    const node = _state.tree[id];
    node.isCollapsed = false;

    const newId = getUniqueId();

    _state.tree[newId] = mapTreeToTreeProps({
      id: {
        id: newId,
        indent: node.indent + 1,
        isCollapsed: false,
        successors: [],
        text: "New Item",
      },
    })[id];

    _state.tree[id].successors.push(newId);
  };
