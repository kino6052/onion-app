import { TItem, TItemProps } from "../../components/Item/types";
import { TWordProps } from "../../components/Word/types";
import {
  EPage,
  TIsLoadingState,
  TPageTypeState,
  TWithComponent,
} from "../../types";

export type TPureNoteProps = TPageTypeState<EPage.Note> & {
  itemProps: TItemProps;
  wordTreeProps: TWordProps;
} & TIsLoadingState;

export type TNoteProps = TWithComponent<TPureNoteProps> & TPureNoteProps;

export type TSerializedWord = { id: string; open: string; closed: string };

export type TDeserializedWord = {
  id: string;
  open: (string | TDeserializedWord)[];
  closed: string;
};

export type TNoteState = {
  item: TItem;
  wordTree: TDeserializedWord;
  isLoading: boolean;
};
