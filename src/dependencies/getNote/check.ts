import { EConstant } from "../../constants";
import { wait } from "../../utils";
import { notes } from "./data";
import { TGetNote } from "./types";

export const getNote: TGetNote = async (id: string) => {
  await wait(1000);

  const note = notes[id];

  if (!note) {
    notes[id] = {
      [EConstant.Root]: {
        id: EConstant.Root,
        closed: EConstant.Root,
        open: "Go to the menu and add your text",
      },
    };
  }

  return notes[id];
};
