import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { NotePage } from ".";
import { TNoteProps, TDeserializedWord } from "./types";
import { EPage } from "../../types";
import { EConstant } from "../../../constants";
import { deserializeNote } from "./utils/tree";
import { TWordProps } from "../../components/Word/types";
import { noop } from "../../utils";
import { getInitialNoteState } from "./utils";

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

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: getInitialNoteState(),
};
