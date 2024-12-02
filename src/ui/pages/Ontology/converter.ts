import { EConstant } from "../../../constants";
import {
  THierarchicalItem,
  THierarchicalItemProps,
  TItem,
} from "../../components/Item/types";
import { EPage } from "../../types";
import { getUpdateState, noop } from "../../utils";
import { HierarchicalItem } from "./components/HierarchicalItem";
import { TOntologyProps, TOntologyState } from "./types";

interface TreeNode extends THierarchicalItem {
  children: TreeNode[];
}

function createTree(
  nodeMap: Record<string, THierarchicalItem>
): THierarchicalItemProps {
  const root = nodeMap[EConstant.Root];

  if (!root) throw new Error("No root");

  // Recursive helper function to build tree
  const buildTree = (node: THierarchicalItem): THierarchicalItemProps => {
    // Get successor nodes
    const successors = node.successors.map(id => {
      const successor = nodeMap[id];
      if (!successor) {
        throw new Error(`Node ${id} not found`);
      }
      return buildTree(successor);
    });

    // Return node with successors as hierarchical props
    return {
      ...node,
      successors,
      onClick: noop,
      onMenuClick: noop,
      menuProps: {
        id: "menu",
        itemsProps: [],
        onBackgroundClick: noop,
        isOpen: node.isMenuOpen,
      },
    };
  };

  return buildTree(root);
}

export const mapStateToProps = (
  state: TOntologyState,
  setState: (cb: (state: TOntologyState) => TOntologyState) => void
): TOntologyProps => {
  return {
    isLoading: state.isLoading,
    menuProps: {
      id: "menu",
      onClick: noop,
      onMenuClick: noop,
      text: "Menu",
    },
    pageType: EPage.Ontology,
    hierarchicalItemProps: createTree(state.tree),
  };
};

export const converter = (props: TOntologyProps): TOntologyProps => {
  return getUpdateState(props)((_props) => {
    _props.ItemComponent = HierarchicalItem;
  });
};
