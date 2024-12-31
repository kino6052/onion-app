import { TSerializedWord } from "../../pages/Note/types";

export type TGetNote = (id: string) => Promise<Record<string, TSerializedWord>>;
