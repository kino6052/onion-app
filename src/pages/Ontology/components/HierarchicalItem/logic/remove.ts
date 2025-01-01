import { THierarchicalItem } from "../../../../../components/Item/types";
import { EPage, TAppState, TSetState } from "../../../../../types";

const removeNodeAndDescendants = (
  nodeId: string,
  tree: Record<string, THierarchicalItem>
) => {
  const node = tree[nodeId];
  if (!node) return;

  // Recursively remove all successors
  node.successors.forEach((successorId) =>
    removeNodeAndDescendants(successorId, tree)
  );

  // Remove the node itself
  delete tree[nodeId];
};

export const menuItemRemove = (
  id: string,
  parent: THierarchicalItem | undefined,
  setState: TSetState<TAppState>
) => ({
  id: "remove",
  text: "Remove",
  onClick: () => {
    setState((prev) => {
      if (prev.pageType !== EPage.Ontology)
        throw new Error("Current page is not an ontology page");

      const tree = { ...prev.pageState.tree };

      if (!parent) throw new Error("No parent");

      // Remove the node and its descendants
      removeNodeAndDescendants(id, tree);

      // Remove the node from its parent's successors
      parent.successors = parent.successors.filter((_id) => _id !== id);

      return {
        ...prev,
        pageState: {
          ...prev.pageState,
          tree,
        },
      };
    });
  },
});
