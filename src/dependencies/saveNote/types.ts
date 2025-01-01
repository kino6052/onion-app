import { TSerializedWord } from "../../pages/Note/types";

export type TSaveNote = (
  note: TSerializedWord,
  isRemote?: boolean // should persist remotely
) => Promise<void>;
