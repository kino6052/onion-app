import { EConstant } from "../../../../../constants";
import { TSerializedWord } from "../../types";
import { generateTreePropsFromTree } from "../../utils";
import {
  deserializeNote,
  findNodeById,
  findNotePropsById,
  serializeNote,
} from "../tree";

describe("Note", () => {
  it("should compose note tree from data", () => {
    const data = {
      [EConstant.Root]: {
        id: EConstant.Root,
        open: "This is a really cool {{1}}, that I want to share with {{2}}.",
        closed: "Root",
        isCollapsed: false,
      },
      "1": {
        id: "1",
        open: "comprehensible piece of knowledge",
        closed: "stuff",
        isCollapsed: false,
      },
      "2": {
        id: "2",
        open: "wonderful human {{3}}",
        closed: "peeps",
        isCollapsed: false,
      },
      "3": {
        id: "3",
        open: "stookies",
        closed: "beings",
        isCollapsed: false,
      },
    } satisfies Record<string, TSerializedWord>;

    const wordTree = deserializeNote(data[EConstant.Root], data);

    expect(wordTree).toMatchInlineSnapshot(`
{
  "closed": "Root",
  "editedName": undefined,
  "id": "ROOT",
  "isCollapsed": false,
  "isEditing": undefined,
  "open": [
    "This",
    "is",
    "a",
    "really",
    "cool",
    {
      "closed": "stuff",
      "editedName": undefined,
      "id": "1",
      "isCollapsed": false,
      "isEditing": undefined,
      "open": [
        "comprehensible",
        "piece",
        "of",
        "knowledge",
      ],
      "range": undefined,
    },
    "that",
    "I",
    "want",
    "to",
    "share",
    "with",
    {
      "closed": "peeps",
      "editedName": undefined,
      "id": "2",
      "isCollapsed": false,
      "isEditing": undefined,
      "open": [
        "wonderful",
        "human",
        {
          "closed": "beings",
          "editedName": undefined,
          "id": "3",
          "isCollapsed": false,
          "isEditing": undefined,
          "open": [
            "stookies",
          ],
          "range": undefined,
        },
      ],
      "range": undefined,
    },
  ],
  "range": undefined,
}
`);
  });

  it("should convert tree back to data", () => {
    const data = {
      [EConstant.Root]: {
        id: EConstant.Root,
        open: "This is a really cool {{1}}, that I want to share with {{2}}.",
        closed: "Root",
      },
      "1": {
        id: "1",
        open: "comprehensible piece of knowledge",
        closed: "stuff",
      },
      "2": {
        id: "2",
        open: "wonderful human {{3}}",
        closed: "peeps",
      },
      "3": {
        id: "3",
        open: "stookies",
        closed: "beings",
      },
    };

    const wordTree = deserializeNote(data[EConstant.Root], data);

    const result = serializeNote(wordTree);

    expect(result).toMatchInlineSnapshot(`
{
  "1": {
    "closed": "stuff",
    "id": "1",
    "isCollapsed": false,
    "open": "comprehensible piece of knowledge",
  },
  "2": {
    "closed": "peeps",
    "id": "2",
    "isCollapsed": false,
    "open": "wonderful human {{3}}",
  },
  "3": {
    "closed": "beings",
    "id": "3",
    "isCollapsed": false,
    "open": "stookies",
  },
  "ROOT": {
    "closed": "Root",
    "id": "ROOT",
    "isCollapsed": false,
    "open": "This is a really cool {{1}} that I want to share with {{2}}",
  },
}
`);
  });

  it("should find node by id", () => {
    const data = {
      [EConstant.Root]: {
        id: EConstant.Root,
        open: "This is a really cool {{1}}, that I want to share with {{2}}.",
        closed: "Root",
      },
      "1": {
        id: "1",
        open: "comprehensible piece of knowledge",
        closed: "stuff",
      },
      "2": {
        id: "2",
        open: "wonderful human {{3}}",
        closed: "peeps",
      },
      "3": {
        id: "3",
        open: "stookies",
        closed: "beings",
      },
    };

    const tree = deserializeNote(data[EConstant.Root], data);

    expect(findNodeById("1", tree)).toMatchInlineSnapshot(`
{
  "closed": "stuff",
  "editedName": undefined,
  "id": "1",
  "isCollapsed": false,
  "isEditing": undefined,
  "open": [
    "comprehensible",
    "piece",
    "of",
    "knowledge",
  ],
  "range": undefined,
}
`);

    expect(findNodeById("2", tree)).toMatchInlineSnapshot(`
{
  "closed": "peeps",
  "editedName": undefined,
  "id": "2",
  "isCollapsed": false,
  "isEditing": undefined,
  "open": [
    "wonderful",
    "human",
    {
      "closed": "beings",
      "editedName": undefined,
      "id": "3",
      "isCollapsed": false,
      "isEditing": undefined,
      "open": [
        "stookies",
      ],
      "range": undefined,
    },
  ],
  "range": undefined,
}
`);

    expect(findNodeById("3", tree)).toMatchInlineSnapshot(`
{
  "closed": "beings",
  "editedName": undefined,
  "id": "3",
  "isCollapsed": false,
  "isEditing": undefined,
  "open": [
    "stookies",
  ],
  "range": undefined,
}
`);
  });

  it("should find node by id", () => {
    const data = {
      [EConstant.Root]: {
        id: EConstant.Root,
        open: "This is a really cool {{1}}, that I want to share with {{2}}.",
        closed: "Root",
      },
      "1": {
        id: "1",
        open: "comprehensible piece of knowledge",
        closed: "stuff",
      },
      "2": {
        id: "2",
        open: "wonderful human {{3}}",
        closed: "peeps",
      },
      "3": {
        id: "3",
        open: "stookies",
        closed: "beings",
      },
    };

    const tree = generateTreePropsFromTree(
      deserializeNote(data[EConstant.Root], data)
    );

    expect(findNotePropsById("1", tree)).toMatchInlineSnapshot(`
{
  "childrenProps": [
    {
      "children": "comprehensible",
      "index": 0,
      "onClick": [Function],
    },
    {
      "children": "piece",
      "index": 1,
      "onClick": [Function],
    },
    {
      "children": "of",
      "index": 2,
      "onClick": [Function],
    },
    {
      "children": "knowledge",
      "index": 3,
      "onClick": [Function],
    },
  ],
  "id": "1",
  "isCollapsible": true,
  "onClick": [Function],
  "onMenuClick": [Function],
  "text": "stuff",
}
`);

    expect(findNotePropsById("2", tree)).toMatchInlineSnapshot(`
{
  "childrenProps": [
    {
      "children": "wonderful",
      "index": 0,
      "onClick": [Function],
    },
    {
      "children": "human",
      "index": 1,
      "onClick": [Function],
    },
    {
      "childrenProps": [
        {
          "children": "stookies",
          "index": 0,
          "onClick": [Function],
        },
      ],
      "id": "3",
      "isCollapsible": true,
      "onClick": [Function],
      "onMenuClick": [Function],
      "text": "beings",
    },
  ],
  "id": "2",
  "isCollapsible": true,
  "onClick": [Function],
  "onMenuClick": [Function],
  "text": "peeps",
}
`);

    expect(findNotePropsById("3", tree)).toMatchInlineSnapshot(`
{
  "childrenProps": [
    {
      "children": "stookies",
      "index": 0,
      "onClick": [Function],
    },
  ],
  "id": "3",
  "isCollapsible": true,
  "onClick": [Function],
  "onMenuClick": [Function],
  "text": "beings",
}
`);
  });
});
