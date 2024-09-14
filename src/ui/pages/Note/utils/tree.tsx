import { templateParser } from "../../../utils";
import { TProcessedWord, TUnprocessedWord } from "../types";

export const generateWordTree = (
  word: TUnprocessedWord,
  data: Record<string, TUnprocessedWord>
): TProcessedWord => {
  const words = templateParser<typeof data>(word.open, data)
    .filter((word) => word && word !== " ")
    .map((_word) => {
      if (typeof _word === "string") return _word;

      // @ts-ignore
      return generateWordTree(_word, data);
    });

  return {
    id: word.id,
    open: words,
    closed: word.closed,
  };
};

export const generateDataFromTree = (
  wordTree: TProcessedWord,
  data: Record<string, TUnprocessedWord> = {}
) => {
  const word = {
    closed: wordTree.closed,
    id: wordTree.id,
    open: wordTree.open
      .map((a) => {
        if (typeof a === "string") return a;

        generateDataFromTree(a, data); // FIXME: I'm impure...

        return `{{${a.id}}}`;
      })
      .join(" "),
  };

  data[wordTree.id] = word;

  return data;
};
