import { EConstant } from "../../../constants";
import { TWordProps } from "../../components/Word/types";
import { EPage } from "../../types";
import { noop } from "../../utils";
import { TNoteProps, TDeserializedWord, TSerializedWord } from "./types";
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
  },
};

export const getInitialNoteState = (data = DEFAULT_DATA): TNoteProps => {
  return {
    pageType: EPage.Note,
    itemProps: {
      text: "Note",
      id: "note-page-menu",
      onClick: noop,
      onMenuClick: noop,
    },
    isLoading: true,
    wordTreeProps: generateTreePropsFromTree(
      deserializeNote(data[EConstant.Root], data)
    ),
  };
};
