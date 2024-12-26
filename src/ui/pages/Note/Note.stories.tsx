import type { Meta, StoryObj } from "@storybook/react";
import { NotePage } from ".";
import { getInitialNoteState } from "./utils";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Pages/Note",
  component: NotePage,
} satisfies Meta<typeof NotePage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: getInitialNoteState(),
};
