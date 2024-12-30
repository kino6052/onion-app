import { cloneDeep } from "lodash";
import { FC } from "react";
import { EConstant } from "../../../../../../constants";
import {
  THierarchicalItem,
  THierarchicalItemProps,
} from "../../../../../components/Item/types";
import { TMenuProps } from "../../../../../components/Menu/types";
import {
  EPage,
  TAppProps,
  TAppState,
  TMapStateToProps,
  TSetState,
} from "../../../../../types";
import { noop } from "../../../../../utils";
import { menuItemAdd } from "./add";
import { menuItemRemove } from "./remove";
import { updateNodeProperties } from "../utils";
import { getPromptProps, menuItemRename } from "./rename";
import { setPartial } from "../../../../../utils/setPartial";

const handleMenuClick = (
  node: THierarchicalItem,
  setState: TSetState<TAppState>
) => {
  updateNodeProperties(node.id, { isMenuOpen: true }, setState);
};

const handleBackgroundClick = (
  node: THierarchicalItem,
  setState: TSetState<TAppState>
) => {
  updateNodeProperties(node.id, { isMenuOpen: false }, setState);
};

const buildTree = (
  node: THierarchicalItem,
  parent: THierarchicalItem | undefined,
  nodeMap: Record<string, THierarchicalItem>,
  setState: TSetState<TAppState>,
  MenuComponent: FC<TMenuProps>,
  getUniqueId: () => string,
  indent: number = 0
): THierarchicalItemProps => {
  const successors = node.successors.map((id) => {
    const successor = nodeMap[id];
    if (!successor) {
      throw new Error(`Node ${id} not found`);
    }
    return buildTree(
      successor,
      node,
      nodeMap,
      setState,
      MenuComponent,
      getUniqueId,
      indent + 1
    );
  });

  return {
    ...node,
    indent,
    successors,
    onClick: () => {
      updateNodeProperties(
        node.id,
        {
          isCollapsed: !node.isCollapsed,
        },
        setState
      );
    },
    onMenuClick: () => handleMenuClick(node, setState),
    menuProps: node.isMenuOpen
      ? {
          id: "menu",
          Component: MenuComponent,
          itemsProps: [
            menuItemAdd(node, setState, getUniqueId),
            menuItemRename(node, setState),
            {
              id: "examine",
              text: "Examine",
              onClick: noop,
            },
            menuItemRemove(node.id, parent, setState),
          ],
          onBackgroundClick: () => handleBackgroundClick(node, setState),
          isOpen: node.isMenuOpen,
        }
      : undefined,
    promptProps: node.promptState && getPromptProps(node, setState),
  };
};

export const getMapStateToProps =
  ({
    MenuComponent,
    getUniqueId,
  }: {
    MenuComponent: FC<TMenuProps>;
    getUniqueId: () => string;
  }): TMapStateToProps<TAppState, THierarchicalItemProps> =>
  (state, setState) => {
    if (state.pageType !== EPage.Ontology)
      throw new Error("Expected an ontology page");

    const nodeMap = state.pageState.tree;
    const root = nodeMap[EConstant.Root];

    if (!root) throw new Error("No root");

    return buildTree(
      root,
      undefined,
      nodeMap,
      setState,
      MenuComponent,
      getUniqueId
    );
  };
