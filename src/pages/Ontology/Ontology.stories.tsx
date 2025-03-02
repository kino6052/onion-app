import type { Meta, StoryObj } from "@storybook/react";
import { EConstant } from "../../constants";
import { EPage, TAppProps, TAppState } from "../../types";
import { getMapStateToProps } from "./logic";
import { TOntologyProps } from "./types";
import { mapStateToHierarchicalItemProps } from "./components/HierarchicalItem";
import { OntologyPage } from "./OntologyPage";
import { saveOntology } from "../../dependencies/saveOntology/check";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Pages/Ontology",
  component: ({ props }) => (
    <OntologyPage {...(props.pageProps as TOntologyProps)} />
  ),
} satisfies Meta<React.FC<{ props: TAppProps; state: TAppState<EPage> }>>;

export default meta;
type Story = StoryObj<typeof meta>;

const state001 = {
  pageType: EPage.Ontology,
  pageState: {
    id: "ROOT",
    isLoading: false,
    tree: {
      [EConstant.Root]: {
        id: EConstant.Root,
        isCollapsed: false,
        isMenuOpen: false,
        successors: [],
        text: EConstant.Root,
      },
    },
  },
} satisfies TAppState<EPage.Ontology>;

export const _001Initial: Story = {
  args: {
    state: state001,
    props: getMapStateToProps({
      mapStateToHierarchicalItemProps,
      saveOntology,
    })(state001, () => {}),
  },
};

const state002 = {
  pageType: EPage.Ontology,
  pageState: {
    id: "ROOT",
    isLoading: true,
    tree: {
      [EConstant.Root]: {
        id: EConstant.Root,
        isCollapsed: false,
        isMenuOpen: false,
        successors: [],
        text: EConstant.Root,
      },
    },
  },
} satisfies TAppState<EPage.Ontology>;

export const _002Loading: Story = {
  args: {
    state: state002,
    props: getMapStateToProps({
      mapStateToHierarchicalItemProps,
      saveOntology,
    })(state002, () => {}),
  },
};

const state003 = {
  pageType: EPage.Ontology,
  pageState: {
    id: "ROOT",
    isLoading: false,
    tree: {
      [EConstant.Root]: {
        id: EConstant.Root,
        isCollapsed: false,
        isMenuOpen: false,
        successors: ["001", "002"],
        text: EConstant.Root,
      },
      "001": {
        id: "001",
        isCollapsed: false,
        isMenuOpen: false,
        successors: ["0011", "0012"],
        text: "001",
      },
      "002": {
        id: "002",
        isCollapsed: false,
        isMenuOpen: false,
        successors: [],
        text: "002",
      },
      "0011": {
        id: "0011",
        isCollapsed: false,
        isMenuOpen: false,
        successors: [],
        text: "0011",
      },
      "0012": {
        id: "0012",
        isCollapsed: false,
        isMenuOpen: false,
        successors: [],
        text: "0012",
      },
    },
  },
} satisfies TAppState<EPage.Ontology>;

export const _003Tree: Story = {
  args: {
    state: state003,
    props: getMapStateToProps({
      mapStateToHierarchicalItemProps,
      saveOntology,
    })(state003, () => {}),
  },
};

const state004 = {
  pageType: EPage.Ontology,
  pageState: {
    id: "ROOT",
    isLoading: false,
    tree: {
      ROOT: {
        id: "ROOT",
        isCollapsed: false,
        isMenuOpen: false,
        successors: ["001", "002"],
        text: "ROOT",
      },
      "001": {
        id: "001",
        isCollapsed: true,
        isMenuOpen: false,
        successors: ["0011", "0012"],
        text: "001",
      },
      "002": {
        id: "002",
        isCollapsed: false,
        isMenuOpen: false,
        successors: [],
        text: "002",
      },
      "0011": {
        id: "0011",
        isCollapsed: false,
        isMenuOpen: false,
        successors: [],
        text: "0011",
      },
      "0012": {
        id: "0012",
        isCollapsed: false,
        isMenuOpen: false,
        successors: [],
        text: "0012",
      },
    },
  },
} satisfies TAppState<EPage.Ontology>;

export const _004Collapsed: Story = {
  args: {
    state: state004,
    props: getMapStateToProps({
      mapStateToHierarchicalItemProps,
      saveOntology,
    })(state004, () => {}),
  },
};

const state005 = {
  pageType: EPage.Ontology,
  pageState: {
    id: "ROOT",
    isLoading: false,
    tree: {
      [EConstant.Root]: {
        id: EConstant.Root,
        isCollapsed: false,
        isMenuOpen: false,
        successors: [],
        text: EConstant.Root,
      },
    },
    isMenuOpen: true,
  },
} satisfies TAppState<EPage.Ontology>;

export const _005Initial: Story = {
  args: {
    state: state005,
    props: getMapStateToProps({
      mapStateToHierarchicalItemProps,
      saveOntology,
    })(state005, () => {}),
  },
};

const state006 = {
  pageType: EPage.Ontology,
  pageState: {
    id: "ROOT",
    isLoading: false,
    tree: {
      [EConstant.Root]: {
        id: EConstant.Root,
        isCollapsed: false,
        isMenuOpen: true,
        successors: [],
        text: EConstant.Root,
      },
    },
    isMenuOpen: false,
  },
} satisfies TAppState<EPage.Ontology>;

export const _006Initial: Story = {
  args: {
    state: state006,
    props: getMapStateToProps({
      mapStateToHierarchicalItemProps,
      saveOntology,
    })(state006, () => {}),
  },
};

const state007 = {
  pageType: EPage.Ontology,
  pageState: {
    id: "ROOT",
    isLoading: false,
    tree: {
      [EConstant.Root]: {
        id: EConstant.Root,
        isCollapsed: false,
        isMenuOpen: true,
        successors: [],
        text: EConstant.Root,
        promptState: {
          text: "Text",
        },
      },
    },
    isMenuOpen: false,
  },
} satisfies TAppState<EPage.Ontology>;

export const _007Initial: Story = {
  args: {
    state: state007,
    props: getMapStateToProps({
      mapStateToHierarchicalItemProps,
      saveOntology,
    })(state007, () => {}),
  },
};

const state008 = {
  pageType: EPage.Ontology,
  pageState: {
    id: "ROOT",
    isLoading: false,
    tree: {
      [EConstant.Root]: {
        id: EConstant.Root,
        isCollapsed: false,
        isMenuOpen: true,
        successors: [],
        text: EConstant.Root,
        promptState: {
          text: "Text",
        },
      },
    },
    hasError: true,
    message: "Ooops",
    isMenuOpen: false,
  },
} satisfies TAppState<EPage.Ontology>;

export const _008Initial: Story = {
  args: {
    state: state008,
    props: getMapStateToProps({
      mapStateToHierarchicalItemProps,
      saveOntology,
    })(state008, () => {}),
  },
};
