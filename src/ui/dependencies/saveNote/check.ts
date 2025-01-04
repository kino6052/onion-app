import { notes } from "../getNote/data";
import { TSaveNote } from "./types";

export const saveNote: TSaveNote = async (id, ontologyId, note, isRemote) => {
  notes[ontologyId][id] = note;
};
