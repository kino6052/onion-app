import { EConstant } from "../../../../constants";
import {
  THierarchicalItem,
  THierarchicalItemProps,
} from "../../../components/Item/types";
import { Menu } from "../../../components/Menu";
import { noop } from "../../../utils";

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

/**
 * Converts a flat object of nodes into a tree structure. A node map is an object where each key is a node ID
 * and each value contains that node's data (like text, successors list, etc). This function takes that flat
 * structure and builds a proper parent-child tree starting from the ROOT node.
 *
 * For example, a node map like:
 * ```
 * {
 *   ROOT: { id: 'ROOT', successors: ['001'] },
 *   '001': { id: '001', successors: ['002'] },
 *   '002': { id: '002', successors: [] }
 * }
 * ```
 *
 * Gets converted into a tree structure like:
 * ```
 * {
 *   id: 'ROOT',
 *   successors: [{
 *     id: '001',
 *     successors: [{
 *       id: '002',
 *       successors: []
 *     }]
 *   }]
 * }
 * ```
 *
 * @param nodeMap - An object mapping node IDs to their data (text, successors, collapse state, etc)
 * @returns A tree structure starting from the root node with all child relationships resolved
 */
export function createTree(
  nodeMap: Record<string, THierarchicalItem>
): THierarchicalItemProps {
  const root = nodeMap[EConstant.Root];

  if (!root) throw new Error("No root");

  // Recursive helper function to build tree
  const buildTree = (
    node: THierarchicalItem,
    indent: number = 0
  ): THierarchicalItemProps => {
    // Get successor nodes
    const successors = node.successors.map((id) => {
      const successor = nodeMap[id];
      if (!successor) {
        throw new Error(`Node ${id} not found`);
      }
      return buildTree(successor, indent + 1);
    });

    // Return node with successors as hierarchical props
    return {
      ...node,
      indent,
      successors,
      onClick: noop,
      onMenuClick: noop,
      menuProps: {
        id: "menu",
        Component: Menu,
        itemsProps: [
          {
            id: "ontology",
            text: "Ontology",
            onClick: noop,
            onMenuClick: noop,
          },
        ],
        onBackgroundClick: noop,
        isOpen: node.isMenuOpen,
      },
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

  return buildTree(root);
}
