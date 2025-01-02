import { wait } from "../../utils";
import { notes } from "../getNote/data";
import { TSaveNote } from "./types";

export const saveNote: TSaveNote = async (id, note, isRemote) => {
  await wait(1000);

  notes[id] = note;
};
