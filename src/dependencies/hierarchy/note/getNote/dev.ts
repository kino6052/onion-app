import { TSerializedWord } from "../../../../pages/Note/types";
import { ENDPOINT } from "../../../common/constants";
import { TGetNote } from "./types";

export const getNote: TGetNote = async (id: string, ontologyId: string) => {
  const response = await fetch(`${ENDPOINT}/notes/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch ontology");
  }

  const tree: Record<string, TSerializedWord> = await response.json();

  if (!tree) throw new Error("No ontology found");

  return tree;
};
