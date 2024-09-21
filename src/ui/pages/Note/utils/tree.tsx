import { templateParser } from "../../../utils";
import { TDeserializedWord, TSerializedWord } from "../types";

/** Generates word tree from from the serialized data like
 * {
 *  "id1": { "id": "id1", open: "this is {{id2}}!", closed: "Closed" },
 *  "id2": { "id": "id2", open: "cool stuff", closed: "closed" },
 * }
 */
export const deserializeNote = (
  word: TSerializedWord,
  data: Record<string, TSerializedWord>
): TDeserializedWord => {
  const words = templateParser<typeof data>(word.open, data)
    .filter((word) => word && word !== " ")
    .map((_word) => {
      if (typeof _word === "string") return _word;

      // @ts-ignore
      return deserializeNote(_word, data);
    });

  return {
    id: word.id,
    open: words,
    closed: word.closed,
  };
};

/** Serializes data back into the form:
 * {
 *  "id1": { "id": "id1", open: "this is {{id2}}!", closed: "Closed" },
 *  "id2": { "id": "id2", open: "cool stuff", closed: "closed" },
 * }
 */
export const serializeNote = (
  wordTree: TDeserializedWord,
  data: Record<string, TSerializedWord> = {}
) => {
  const word = {
    closed: wordTree.closed,
    id: wordTree.id,
    open: wordTree.open
      .map((a) => {
        if (typeof a === "string") return a;

        serializeNote(a, data); // FIXME: I'm impure...

        return `{{${a.id}}}`;
      })
      .join(" "),
  };

  data[wordTree.id] = word;

  return data;
};
