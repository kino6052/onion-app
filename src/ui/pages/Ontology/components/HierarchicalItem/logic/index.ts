import { FC } from "react";
import { EConstant } from "../../../../../../constants";
import {
  THierarchicalItem,
  THierarchicalItemProps,
} from "../../../../../components/Item/types";
import { TMenuProps } from "../../../../../components/Menu/types";
import {
  EPage,
  TMapStateToProps,
  TAppState,
  TSetState,
} from "../../../../../types";
import { noop } from "../../../../../utils";
import { cloneDeep } from "lodash";
import { handleAddChild, menuItemAdd } from "./add";
import { menuItemRemove } from "./remove";

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
    onClick: noop,
    onMenuClick: () => handleMenuClick(node, setState),
    menuProps: node.isMenuOpen
      ? {
          id: "menu",
          Component: MenuComponent,
          itemsProps: [
            menuItemAdd(node, setState, getUniqueId),
            {
              id: "rename",
              text: "Rename",
              onClick: noop,
            },
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
    promptProps: node.promptState && {
      buttonProps: {
        onClick: noop,
        children: "Apply",
        hasIcon: false,
      },
      cancelButtonProps: {
        onClick: noop,
        children: "Cancel",
        hasIcon: false,
      },
      description: "Type new text",
      onBackgrounClick: noop,
      textProps: {
        value: node.text,
        onChange: noop,
        isDisabled: false,
        placeholder: "Type new text",
      },
      title: "Edit node",
    },
  };
};

export const getMapStateToProps =
  ({
    MenuComponent,
    getUniqueId,
  }: {
    MenuComponent: FC<TMenuProps>;
    getUniqueId: () => string;
  }): TMapStateToProps<THierarchicalItemProps> =>
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

const updateNodeProperties = (
  nodeId: string,
  partialProps: Partial<THierarchicalItem>,
  setState: TSetState<TAppState>
) => {
  setState((prevState) => {
    if (prevState.pageType !== EPage.Ontology)
      throw new Error("Current page is not an ontology page");

    const tree = cloneDeep(prevState.pageState.tree);
    const node = tree[nodeId];

    if (!node) throw new Error(`Node with ID ${nodeId} not found`);

    tree[nodeId] = {
      ...node,
      ...partialProps,
    };

    return {
      ...prevState,
      pageState: {
        ...prevState.pageState,
        tree,
      },
    };
  });
};
