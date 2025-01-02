import { EConstant } from "../../constants";
import { TWordProps } from "../../components/Word/types";
import { EPage, TAppState, TSetState } from "../../types";
import { noop } from "../../utils";
import { setPartial } from "../../utils/setPartial";
import { TDeserializedWord, TNoteState, TSerializedWord } from "./types";

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
    ontologyId: "id",
    wordTree: data,
  };
};

export const updateWordProperties = (
  nodeId: string,
  partialProps: Partial<TSerializedWord>,
  setState: TSetState<TAppState>
) => {
  setPartial(
    {
      pageState: {
        wordTree: {
          [nodeId]: partialProps,
        },
      },
    },
    setState,
    EPage.Note
  );
};

export const removeNodeFromWordTree = (
  nodeId: string,
  setState: TSetState<TAppState>
) => {
  setState((prevState) => {
    if (nodeId === EConstant.Root) throw new Error("Cannot remove Root node");

    if (prevState.pageType !== EPage.Note)
      throw new Error("Current page is not a note page");

    const wordTree = { ...prevState.pageState.wordTree };

    // Retrieve the inner text of the node being removed
    const removedNode = wordTree[nodeId];
    if (!removedNode) throw new Error(`Node with ID ${nodeId} not found`);

    const innerText = removedNode.open;

    // Remove the node itself
    delete wordTree[nodeId];

    // Replace references to the node with its inner text in other nodes
    Object.keys(wordTree).forEach((key) => {
      const node = wordTree[key];
      if (node.open.includes(`{{${nodeId}}}`)) {
        node.open = node.open.replace(`{{${nodeId}}}`, innerText).trim();
      }
    });

    return {
      ...prevState,
      pageState: {
        ...prevState.pageState,
        wordTree,
      },
    };
  });
};
