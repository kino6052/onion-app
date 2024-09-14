import { TItemProps } from "../../components/Item/types";
import { TWordProps } from "../../components/Word/types";
import { EPage, TWithPageType } from "../../types";

export type TNoteProps = TWithPageType<
  {
    itemProps: TItemProps;
    wordTreeProps: TWordProps;
  },
  EPage.Note
>;

export type TUnprocessedWord = { id: string; open: string; closed: string };
export type TProcessedWord = {
  id: string;
  open: (string | TProcessedWord)[];
  closed: string;
};
