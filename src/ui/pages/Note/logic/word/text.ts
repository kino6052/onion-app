import { TGetUniqueId } from "../../../../dependencies/getUniqueId/types";
import { EPage, TAppState, TSetState } from "../../../../types";
import { setPartial } from "../../../../utils/setPartial";
import { TSerializedWord } from "../../types";

const getWordRangeIndex = (word: TSerializedWord): number | undefined => {
  return word.range?.filter((v) => v !== undefined)[0];
};

const createNewWord = (
  id: string,
  open: string[],
  index: number,
  i: number,
  getUniqueId: TGetUniqueId
) => {
  const newStuff = open.slice(index, i + 1);
  const newId = getUniqueId();

  return {
    newId,
    newWord: {
      id: newId,
      closed: "[summary]",
      isCollapsed: true,
      open: newStuff.join(" "),
    },
    updatedOpen: [
      ...open.slice(0, index),
      `{{${newId}}}`,
      ...open.slice(i + 1),
    ].join(" "),
  };
};

export const getHandleWordClick = ({
  id,
  i,
  setState,
  wordTree,
  getUniqueId,
}: {
  id: string;
  i: number;
  setState: TSetState<TAppState>;
  wordTree: Record<string, TSerializedWord>;
  getUniqueId: TGetUniqueId;
}) => {
  const word = wordTree[id];
  if (!word) throw new Error(`No word with id "${id}"`);

  const index = getWordRangeIndex(word);

  if (index !== undefined) {
    const open = wordTree[id].open.split(" ");
    const { newId, newWord, updatedOpen } = createNewWord(
      id,
      open,
      index,
      i,
      getUniqueId
    );

    setPartial(
      {
        pageState: {
          wordTree: {
            [id]: {
              open: updatedOpen,
              range: [undefined, undefined],
            },
            [newId]: newWord,
          },
        },
      },
      setState,
      EPage.Note
    );

    return;
  }

  setPartial(
    {
      pageState: {
        wordTree: {
          [id]: {
            range: [i, undefined],
          },
        },
      },
    },
    setState,
    EPage.Note
  );
};
