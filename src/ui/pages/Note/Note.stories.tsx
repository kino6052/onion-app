import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { NotePage } from ".";
import { TNoteProps, TProcessedWord } from "./types";
import { EPage } from "../../types";
import { EConstant } from "../../../constants";
import { generateWordTree } from "./utils/tree";
import { TWordProps } from "../../components/Word/types";
import { noop } from "../../utils";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Pages/Note",
  component: NotePage,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: [],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof NotePage>;

export default meta;
type Story = StoryObj<typeof meta>;

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

const generateTreePropsFromTree = (tree: TProcessedWord): TWordProps => {
  return {
    id: tree.id,
    isCollapsible: true,
    // onClick: noop,
    onMenuClick: noop,
    childrenProps: tree.open.map((item) => {
      if (typeof item === "string") return item;

      return generateTreePropsFromTree(item);
    }),
  };
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    itemProps: {
      id: "",
      text: "Test",
      // onClick: noop,
      onMenuClick: noop,
    },
    pageType: EPage.Note,
    wordTreeProps: generateTreePropsFromTree(wordTree),
  } as TNoteProps,
};
