import { EConstant } from "../../../../constants";
import { wait } from "../../../../utils";
import { notes } from "./data";
import { TGetNote } from "./types";

export const getNote: TGetNote = async (id: string, ontologyId: string) => {
  const note = notes[ontologyId]?.[id];

  if (!note) {
    notes[ontologyId] = {
      [id]: {
        [EConstant.Root]: {
          id: EConstant.Root,
          closed: EConstant.Root,
          open: "Go to the menu and add your text",
        },
      },
    };
  }

  return notes[ontologyId][id];
};
