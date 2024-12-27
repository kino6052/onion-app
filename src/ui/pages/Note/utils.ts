import { EConstant } from "../../../constants";
import { TWordProps } from "../../components/Word/types";
import { noop } from "../../utils";
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
    wordTree: deserializeNote(data[EConstant.Root], data),
  };
};
