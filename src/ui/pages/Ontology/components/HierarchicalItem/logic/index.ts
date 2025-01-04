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
  TNotePageState,
  TSetState,
} from "../../../../../../types";
import { noop } from "../../../../../../utils";
import { menuItemAdd } from "./add";
import { menuItemRemove } from "./remove";
import { updateNodeProperties } from "../utils";
import { getPromptProps, menuItemRename } from "./rename";
import { setPartial } from "../../../../../utils/setPartial";
import { TNoteState, TSerializedWord } from "../../../../Note/types";
import { deserializeNote } from "../../../../Note/utils/tree";
import { TGetUniqueId } from "../../../../../dependencies/getUniqueId/types";
import { TGetNote } from "../../../../../dependencies/getNote/types";

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

const buildTree =
  (dependencies: {
    getNote: TGetNote;
    getUniqueId: () => string;
    MenuComponent: FC<TMenuProps>;
  }) =>
  (
    node: THierarchicalItem,
    parent: THierarchicalItem | undefined,
    nodeMap: Record<string, THierarchicalItem>,
    setState: TSetState<TAppState>,

    indent: number = 0
  ): THierarchicalItemProps => {
    const { MenuComponent, getUniqueId, getNote } = dependencies;
    const successors = node.successors.map((id) => {
      const successor = nodeMap[id];
      if (!successor) {
        throw new Error(`Node ${id} not found`);
      }
      return buildTree(dependencies)(
        successor,
        node,
        nodeMap,
        setState,
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
                onClick: () => {
                  setPartial(
                    {
                      pageState: {
                        isLoading: true,
                      },
                    },
                    setState,
                    EPage.Ontology
                  );

                  setState((prev) => {
                    if (!prev.pageState.id) throw new Error("No ontology id");

                    getNote(node.id, prev.pageState.id).then((data) => {
                      setState((prev) => {
                        const ontologyId = prev.pageState.id;

                        if (!ontologyId) throw new Error("No ontology id");

                        return {
                          ...prev,
                          pageState: {
                            id: node.id,
                            ontologyId,
                            isLoading: false,
                            wordTree: data,
                          },
                          pageType: EPage.Note,
                        };
                      });
                    });

                    return prev;
                  });
                },
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
    getNote,
  }: {
    MenuComponent: FC<TMenuProps>;
    getUniqueId: TGetUniqueId;
    getNote: TGetNote;
  }): TMapStateToProps<TAppState, THierarchicalItemProps> =>
  (state, setState) => {
    if (state.pageType !== EPage.Ontology)
      throw new Error("Expected an ontology page");

    const nodeMap = state.pageState.tree;
    const root = nodeMap[EConstant.Root];

    if (!root) throw new Error("No root");

    return buildTree({
      getNote,
      getUniqueId,
      MenuComponent,
    })(root, undefined, nodeMap, setState);
  };
