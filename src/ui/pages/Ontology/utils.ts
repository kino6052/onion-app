import { EConstant } from "../../../constants";
import { EPage } from "../../types";
import { noop } from "../../utils";
import { TOntologyProps } from "./types";

export const getInitialOntologyTree = () => ({
  [EConstant.Root]: {
    id: EConstant.Root,
    indent: 0,
    isCollapsed: false,
    text: "ROOT",
    successors: [],
  },
});

export const getInitialOntologyState = (): TOntologyProps => ({
  menuProps: {
    id: "menu",
    text: "Menu",
    onClick: noop,
    onMenuClick: noop,
  },
  isLoading: true,
  pageType: EPage.Ontology,
  tree: getInitialOntologyTree(),
});
