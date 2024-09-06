import { EPage, TAppProps } from "../../../../types";
import { mapTreeToTreeProps } from "../../utils";

export const closeMenu = (id: string) => (_state: TAppProps) => {
  if (_state.pageType !== EPage.Ontology) return;

  const node = _state.tree[id];

  node.menuProps.isOpen = false;
};

export const removeItem =
  ({ id }: { id: string }) =>
  (_state: TAppProps) => {
    if (_state.pageType !== EPage.Ontology) return;

    delete _state.tree[id];
  };

export const addNewItem =
  ({ getUniqueId, id }: { getUniqueId: () => string; id: string }) =>
  (_state: TAppProps) => {
    if (_state.pageType !== EPage.Ontology) return;
    const node = _state.tree[id];
    node.isCollapsed = false;

    const newId = getUniqueId();

    const result = mapTreeToTreeProps({
      [newId]: {
        id: newId,
        indent: node.indent + 1,
        isCollapsed: false,
        successors: [],
        text: "New Item",
      },
    });

    console.warn({ result });

    _state.tree[newId] = result[newId];

    _state.tree[id].successors.push(newId);
  };
