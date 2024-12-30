import { assign, cloneDeep } from "lodash";
import { EConstant } from "../../../constants";
import { TWordProps } from "../../components/Word/types";
import { EPage, TAppState, TSetState } from "../../types";
import { noop } from "../../utils";
import { TWithRecursiveFallback } from "../../utils/types";
import { TDeserializedWord, TNoteState, TSerializedWord } from "./types";
import { deserializeNote } from "./utils/tree";

export const generateTreePropsFromTree = (
  tree: TDeserializedWord
): TWordProps => {
  return {
    id: tree.id,
    isCollapsible: true,
    text: tree.closed,
    onClick: noop,
    onMenuClick: noop,
    childrenProps: tree.open.map((item, i) => {
      if (typeof item === "string")
        return {
          children: item,
          index: i,
          onClick: noop,
        };

      return generateTreePropsFromTree(item);
    }),
  };
};

export const DEFAULT_DATA: Record<string, TSerializedWord> = {
  [EConstant.Root]: {
    id: EConstant.Root,
    open: "Empty",
    closed: "Root",
    isCollapsed: true,
  },
};

export const getInitialNoteState = (data = DEFAULT_DATA): TNoteState => {
  return {
    id: "note",
    wordTree: data,
  };
};

export const updateWordProperties = (
  nodeId: string,
  partialProps: TWithRecursiveFallback<TWordProps>,
  setState: TSetState<TAppState>
) => {
  setState((prevState) => {
    if (prevState.pageType !== EPage.Note)
      throw new Error("Current page is not an ontology page");

    const tree = cloneDeep(prevState.pageState.wordTree);
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
