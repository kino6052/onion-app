import type { Meta, StoryObj } from "@storybook/react";
import { NotePage } from ".";
import { getInitialNoteState } from "./utils";
import { mapStateToProps } from "./converter";
import { EPage, TNotePageState } from "../../types";
import { deserializeNote } from "./utils/tree";
import { TSerializedWord } from "./types";
import { EConstant } from "../../../constants";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Pages/Note",
  component: NotePage,
} satisfies Meta<typeof NotePage>;

export default meta;
type Story = StoryObj<typeof meta>;

const state001 = {
  pageState: {
    ...getInitialNoteState(),
    isLoading: false,
  },
  pageType: EPage.Note,
} satisfies TNotePageState;

export const _001: Story = {
  args: mapStateToProps()(state001, () => {}),
};

const state002 = {
  pageState: {
    ...getInitialNoteState(),
    isLoading: true,
  },
  pageType: EPage.Note,
} satisfies TNotePageState;

export const _002: Story = {
  args: mapStateToProps()(state002, () => {}),
};

const data003: Record<string, TSerializedWord> = {
  [EConstant.Root]: {
    id: EConstant.Root,
    open: "This is {{id1}}! However, {{id2}} is {{id3}}.",
    closed: "Root",
    isCollapsed: false,
  },
  ["id1"]: {
    id: "id1",
    open: "a very complicated and detailed thing",
    closed: "a thing",
    isCollapsed: false,
  },
  ["id2"]: {
    id: "id2",
    open: "this is yet another such {{id1}}!",
    closed: "stuff",
    isCollapsed: false,
  },
  ["id3"]: {
    id: "id3",
    open: "rather delicate and fragile and yet so beautiful",
    closed: "quite a thing",
    isCollapsed: false,
  },
};

const state003 = {
  pageState: {
    id: "note",
    wordTree: deserializeNote(data003[EConstant.Root], data003),
    isLoading: false,
  },
  pageType: EPage.Note,
} satisfies TNotePageState;

export const _003: Story = {
  args: mapStateToProps()(state003, () => {}),
};

const state004 = {
  pageState: {
    id: "note",
    wordTree: {
      ...deserializeNote(data003[EConstant.Root], data003),
      promptState: { text: "This is a prompt" },
    },
    isLoading: false,
  },
  pageType: EPage.Note,
} satisfies TNotePageState;

export const _004: Story = {
  args: mapStateToProps()(state004, () => {}),
};

const state005 = {
  pageState: {
    id: "note",
    wordTree: {
      ...deserializeNote(data003[EConstant.Root], data003),
      isMenuOpen: true,
    },
    isLoading: false,
  },
  pageType: EPage.Note,
} satisfies TNotePageState;

export const _005: Story = {
  args: mapStateToProps()(state005, () => {}),
};

const state006 = {
  pageState: {
    id: "note",
    wordTree: {
      ...deserializeNote(data003[EConstant.Root], data003),
      isMenuOpen: false,
      range: [1, 5],
    },
    isLoading: false,
  },
  pageType: EPage.Note,
} satisfies TNotePageState;

export const _006: Story = {
  args: mapStateToProps()(state006, () => {}),
};

const state007 = {
  pageState: {
    id: "note",
    wordTree: {
      ...deserializeNote(data003[EConstant.Root], data003),
    },
    isLoading: false,
    hasError: true,
    message: "An error occurred",
  },
  pageType: EPage.Note,
} satisfies TNotePageState;

export const _007: Story = {
  args: mapStateToProps()(state007, () => {}),
};
