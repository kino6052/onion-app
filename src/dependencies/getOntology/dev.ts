import { EConstant } from "../../constants";
import { TGetOntology } from "./types";

export const getOntology: TGetOntology = () =>
  Promise.resolve({
    [EConstant.Root]: {
      id: EConstant.Root,
      isCollapsed: false,
      isMenuOpen: false,
      successors: [],
      text: EConstant.Root,
    },
  });
