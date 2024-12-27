import {
  THierarchicalItem,
  THierarchicalItemProps,
} from "../../../../components/Item/types";
import {
  EPage,
  TAppState,
  TMapStateToProps,
  TSetState,
} from "../../../../types";

export const getMapStateToProps =
  ({
    createTree,
  }: {
    createTree: (
      nodeMap: Record<string, THierarchicalItem>,
      setState: TSetState<TAppState>
    ) => THierarchicalItemProps;
  }): TMapStateToProps<THierarchicalItemProps> =>
  (state, setState) => {
    if (state.pageType !== EPage.Ontology)
      throw new Error("Expected an ontology page");

    return createTree(state.pageState.tree, setState);
  };
