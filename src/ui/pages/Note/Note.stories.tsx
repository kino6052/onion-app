import type { Meta, StoryObj } from "@storybook/react";
import { getInitialNoteState } from "./utils";
import { getMapStateToProps } from "./logic";
import { EPage, TNotePageProps, TNotePageState } from "../../../types";
import { deserializeNote } from "./utils/tree";
import { TSerializedWord } from "./types";
import { EConstant } from "../../../constants";
import { NotePage } from "./NotePage";
import { mapStateToNoteProps } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Pages/Note",
  component: ({ pageProps }: TNotePageProps) => <NotePage {...pageProps} />,
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
  args: mapStateToNoteProps(state001, () => {}),
};

const state002 = {
  pageState: {
    ...getInitialNoteState(),
    isLoading: true,
  },
  pageType: EPage.Note,
} satisfies TNotePageState;

export const _002: Story = {
  args: mapStateToNoteProps(state002, () => {}),
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
    isCollapsed: true,
    editedName: "test",
    isEditing: true,
  },
};

const state003 = {
  pageState: {
    id: "note",
    wordTree: data003,
    isLoading: false,
  },
  pageType: EPage.Note,
} satisfies TNotePageState;

export const _003: Story = {
  args: mapStateToNoteProps(state003, () => {}),
};

const state004 = {
  pageState: {
    id: "note",
    wordTree: {
      ...data003,
    },
    isLoading: false,
  },
  pageType: EPage.Note,
} satisfies TNotePageState;

export const _004: Story = {
  args: mapStateToNoteProps(state004, () => {}),
};

const state005 = {
  pageState: {
    id: "note",
    wordTree: {
      ...data003,
      [EConstant.Root]: {
        id: EConstant.Root,
        closed: "Root",
        open: "This is test",
      },
    },
    isMenuOpen: true,
    isLoading: false,
  },
  pageType: EPage.Note,
} satisfies TNotePageState;

export const _005: Story = {
  args: mapStateToNoteProps(state005, () => {}),
};

const state006 = {
  pageState: {
    id: "note",
    wordTree: {
      ...data003,
      [EConstant.Root]: {
        id: EConstant.Root,
        closed: "Root",
        open: "This is test",
        isMenuOpen: false,
        range: [1, 5],
      },
    },
    isLoading: false,
  },
  pageType: EPage.Note,
} satisfies TNotePageState;

export const _006: Story = {
  args: mapStateToNoteProps(state006, () => {}),
};

const state007 = {
  pageState: {
    id: "note",
    wordTree: data003,
    isLoading: false,
    hasError: true,
    message: "An error occurred",
  },
  pageType: EPage.Note,
} satisfies TNotePageState;

export const _007: Story = {
  args: mapStateToNoteProps(state007, () => {}),
};

const state008 = {
  pageState: {
    id: "note",
    wordTree: data003,
    isLoading: false,
  },
  pageType: EPage.Note,
} satisfies TNotePageState;

export const _008: Story = {
  args: mapStateToNoteProps(state008, () => {}),
};
