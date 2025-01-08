import { TSerializedWord } from "../../pages/Note/types";

export type TGetNote = (
  id: string,
  ontologyId: string
) => Promise<Record<string, TSerializedWord>>;
