import { TItemProps } from "../../components/Item/types";
import { TWordProps } from "../../components/Word/types";
import { EPage, TWithPageType } from "../../types";

export type TNoteProps = TWithPageType<
  {
    itemProps: TItemProps;
    wordTreeProps: TWordProps;
    isLoading: boolean;
  },
  EPage.Note
>;

export type TSerializedWord = { id: string; open: string; closed: string };

export type TDeserializedWord = {
  id: string;
  open: (string | TDeserializedWord)[];
  closed: string;
};
