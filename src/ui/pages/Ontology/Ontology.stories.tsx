import type { Meta, StoryObj } from "@storybook/react";
import { OntologyPage } from ".";
import { EConstant } from "../../../constants";
import { mapStateToProps } from "./converter";
import { TOntologyState } from "./types";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Pages/Ontology",
  component: ({ props }) => <OntologyPage {...props} />,
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
} satisfies Meta<typeof OntologyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const state001 = {
  isLoading: false,
  tree: {
    [EConstant.Root]: {
      id: EConstant.Root,
      indent: 0,
      isCollapsed: false,
      isMenuOpen: false,
      successors: [],
      text: EConstant.Root,
    },
  },
} as TOntologyState;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const _001: Story = {
  args: {
    state: state001,
    props:  mapStateToProps(state001, () => {})
  },
};

const state002 = {
  isLoading: true,
  tree: {
    [EConstant.Root]: {
      id: EConstant.Root,
      indent: 0,
      isCollapsed: false,
      isMenuOpen: false,
      successors: [],
      text: EConstant.Root,
    },
  },
} as TOntologyState;

export const _002: Story = {
  args: {
    state: state002,
    props:  mapStateToProps(state002, () => {})
  },
};

const state003 = {
  isLoading: false,
  tree: {
    [EConstant.Root]: {
      id: EConstant.Root,
      indent: 0,
      isCollapsed: false,
      isMenuOpen: false,
      successors: ['001', '002'],
      text: EConstant.Root,
    },
    '001': {
      id: '001',
      indent: 1,
      isCollapsed: false,
      isMenuOpen: false,
      successors: ['0011', '0012'],
      text: '001',
    },
    '002': {
      id: '002',
      indent: 1,
      isCollapsed: false,
      isMenuOpen: false,
      successors: [],
      text: '002',
    },
    '0011': {
      id: '0011',
      indent: 2,
      isCollapsed: false,
      isMenuOpen: false,
      successors: [],
      text: '0011',
    },
    '0012': {
      id: '0012',
      indent: 2,
      isCollapsed: false,
      isMenuOpen: false,
      successors: [],
      text: '0012',
    },
  },
} as TOntologyState;

export const _003: Story = {
  args: {
    state: state003,
    props:  mapStateToProps(state003, () => {})
  },
};
