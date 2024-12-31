import { THierarchicalItem } from "../../../../../components/Item/types";
import { TGetUniqueId } from "../../../../../dependencies/getUniqueId/types";
import { EPage, TAppState, TSetState } from "../../../../../types";

export const handleAddChild = (
  node: THierarchicalItem,
  setState: TSetState<TAppState>,
  getUniqueId: TGetUniqueId
) => {
  setState((prev) => {
    if (prev.pageType !== EPage.Ontology)
      throw new Error("Current page is not an ontology page");

    const tree = prev.pageState.tree;
    const newNode: THierarchicalItem = {
      id: getUniqueId(),
      isCollapsed: false,
      isMenuOpen: false,
      successors: [],
      text: "New Item",
    };

    node.successors = [...node.successors, newNode.id];
    tree[newNode.id] = newNode;
    tree[node.id] = {
      ...tree[node.id],
      isMenuOpen: false,
    };

    return {
      ...prev,
      pageState: {
        ...prev.pageState,
        tree,
      },
    };
  });
};

export const menuItemAdd = (
  node: THierarchicalItem,
  setState: TSetState<TAppState>,
  getUniqueId: TGetUniqueId
) => ({
  id: "add",
  text: "Add child",
  onClick: () => handleAddChild(node, setState, getUniqueId),
});
