import { TSerializedWord } from "../../pages/Note/types";

export type TSaveNote = (
  id: string,
  note: Record<string, TSerializedWord>,
  isRemote?: boolean // should persist remotely
) => Promise<void>;
