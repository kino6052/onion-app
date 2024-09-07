import { EConstant } from "../../../../constants";
import {
  THierarchicalItem,
  THierarchicalItemProps,
} from "../../../components/Item/types";
import { EPage } from "../../../types";
import { noop } from "../../../utils";
import { getDefaultMenuProps } from "../components/Menu/utils";
import { TOntologyProps } from "../types";

export const getInitialOntologyTree = (): Record<
  string,
  THierarchicalItem
> => ({
  [EConstant.Root]: {
    id: EConstant.Root,
    indent: 0,
    isCollapsed: false,
    text: "ROOT",
    successors: [],
  },
});

export const mapTreeToTreeProps = (
  tree: Record<string, THierarchicalItem>
): Record<string, THierarchicalItemProps> => {
  return Object.fromEntries(
    Object.entries(tree).map(([key, value]) => {
      return [
        key,
        {
          ...value,
          menuProps: getDefaultMenuProps(key),
          onClick: noop,
          onMenuClick: noop,
        } as THierarchicalItemProps,
      ];
    })
  );
};

export const getInitialOntologyState = (): TOntologyProps => ({
  menuProps: {
    id: "menu",
    text: "Menu",
    onClick: noop,
    onMenuClick: noop,
  },
  isLoading: true,
  pageType: EPage.Ontology,
  tree: mapTreeToTreeProps(getInitialOntologyTree()),
});
