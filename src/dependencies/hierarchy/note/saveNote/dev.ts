import { ENDPOINT } from "../../../common/constants";
import { TSaveNote } from "./types";

export const saveNote: TSaveNote = async (id, ontologyId, note, isRemote) => {
  const response = await fetch(`${ENDPOINT}/note`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, note }),
  });

  if (!response.ok) {
    throw new Error("Failed to save note");
  }
};
