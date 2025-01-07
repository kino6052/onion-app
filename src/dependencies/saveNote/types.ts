import { TSerializedWord } from "../../ui/pages/Note/types";

export type TSaveNote = (
  id: string,
  ontologyId: string,
  note: Record<string, TSerializedWord>,
  isRemote?: boolean // should persist remotely
) => Promise<void>;
