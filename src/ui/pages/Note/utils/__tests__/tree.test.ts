import { EConstant } from "../../../../../constants";
import { generateDataFromTree, generateWordTree } from "../tree";

describe("Note", () => {
  it("should compose note tree from data", () => {
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

    const wordTree = generateWordTree(data[EConstant.Root], data);

    expect(wordTree).toMatchInlineSnapshot(`
{
  "closed": "Root",
  "id": "ROOT",
  "open": [
    "This",
    "is",
    "a",
    "really",
    "cool",
    {
      "closed": "stuff",
      "id": "1",
      "open": [
        "comprehensible",
        "piece",
        "of",
        "knowledge",
      ],
    },
    "that",
    "I",
    "want",
    "to",
    "share",
    "with",
    {
      "closed": "peeps",
      "id": "2",
      "open": [
        "wonderful",
        "human",
        {
          "closed": "beings",
          "id": "3",
          "open": [
            "stookies",
          ],
        },
      ],
    },
  ],
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

    const wordTree = generateWordTree(data[EConstant.Root], data);

    const result = generateDataFromTree(wordTree);

    expect(result).toMatchInlineSnapshot(`
{
  "1": {
    "closed": "stuff",
    "id": "1",
    "open": "comprehensible piece of knowledge",
  },
  "2": {
    "closed": "peeps",
    "id": "2",
    "open": "wonderful human {{3}}",
  },
  "3": {
    "closed": "beings",
    "id": "3",
    "open": "stookies",
  },
  "ROOT": {
    "closed": "Root",
    "id": "ROOT",
    "open": "This is a really cool {{1}} that I want to share with {{2}}",
  },
}
`);
  });
});
