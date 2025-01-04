import { EConstant } from "../../../../constants";
import { THierarchicalItem } from "../../../components/Item/types";

export const getInitialOntologyTree = (): Record<
  string,
  THierarchicalItem
> => ({
  [EConstant.Root]: {
    id: EConstant.Root,
    isCollapsed: false,
    text: "ROOT",
    successors: [],
    isMenuOpen: false,
  },
});
