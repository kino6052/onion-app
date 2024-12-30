import { cloneDeep, assign } from "lodash";
import { THierarchicalItem } from "../../../../components/Item/types";
import { EPage, TAppState, TSetState } from "../../../../types";
import { TWithRecursiveFallback } from "../../../../utils/types";

export const updateNodeProperties = (
  nodeId: string,
  partialProps: TWithRecursiveFallback<THierarchicalItem>,
  setState: TSetState<TAppState>
) => {
  setState((prevState) => {
    if (prevState.pageType !== EPage.Ontology)
      throw new Error("Current page is not an ontology page");

    const tree = cloneDeep(prevState.pageState.tree);
    const node = tree[nodeId];

    if (!node) throw new Error(`Node with ID ${nodeId} not found`);

    tree[nodeId] = assign({}, node, partialProps);

    return {
      ...prevState,
      pageState: {
        ...prevState.pageState,
        tree,
      },
    };
  });
};
