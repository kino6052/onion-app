import { isArray } from "lodash";
import { TTextProps } from "../../../components/Text/types";
import { TWordProps } from "../../../components/Word/types";
import { isTextComponent } from "../../../components/Word/utils";
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

export const findNodeById = (id: string, tree: TDeserializedWord) => {
  return findTreeNodeById({
    id,
    tree,
    filter: (v) => typeof v !== "string",
    propName: "open",
  });
};

export const findNotePropsById = (id: string, tree: TWordProps) => {
  return findTreeNodeById({
    id,
    tree,
    filter: (v: TWordProps | TTextProps) => !isTextComponent(v),
    propName: "childrenProps",
  });
};

export function findTreeNodeById<
  PTree extends Record<string, unknown>,
  POther extends unknown,
>({
  id,
  tree,
  propName,
  filter,
}: {
  id: string;
  tree: PTree;
  propName: string;
  filter: (input: PTree | POther) => boolean;
}): PTree | undefined {
  if (id === tree.id) return tree;
  if (!tree[propName] || !isArray(tree[propName])) return;
  if (tree[propName].filter(filter).length === 0) return undefined;
  return tree[propName].reduce(
    (acc: PTree | undefined, v: PTree | POther): PTree | undefined => {
      if (acc) return acc;

      if (!filter(v)) return acc;

      return findTreeNodeById<PTree, POther>({
        id,
        tree: v as PTree,
        propName,
        filter,
      }) as PTree;
    },
    undefined as PTree | undefined
  );
}
