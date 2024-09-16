import { EConstant } from "../../../../../constants";
import { EPage, TAppProps } from "../../../../types";
import { findFirst } from "../../../../utils";
import { mapTreeToTreeProps } from "../../utils";
import { getInitialRenamePromptProps } from "../HierarchicalItem/utils";

export const closeMenu = (id: string) => (_state: TAppProps) => {
  if (_state.pageType !== EPage.Ontology) return;

  const node = _state.tree[id];

  node.menuProps.isOpen = false;
};

export const removeItem =
  ({ id, parentId }: { id: string; parentId?: string }) =>
  (_state: TAppProps) => {
    if (_state.pageType !== EPage.Ontology) return;

    if (id === EConstant.Root) return;

    delete _state.tree[id];

    const parentNode = findFirst([
      !!parentId && _state.tree[parentId],
      undefined,
    ]);

    if (!parentNode) return;

    parentNode.successors = parentNode.successors.filter((_id) => _id !== id);
  };

export const renameItem =
  ({ id }: { id: string; parentId?: string }) =>
  (_state: TAppProps) => {
    if (_state.pageType !== EPage.Ontology) return;

    const node = _state.tree[id];

    node.promptProps = getInitialRenamePromptProps();
  };

export const examineItem = ({ id }: { id: string; parentId?: string }) =>
  (_state: TAppProps) => {
    _state.pageType = EPage.Note;

  }

export const addNewItem =
  ({ getUniqueId, id }: { getUniqueId: () => string; id: string }) =>
  (_state: TAppProps) => {
    if (_state.pageType !== EPage.Ontology) return;
    const node = _state.tree[id];
    node.isCollapsed = false;

    const newId = getUniqueId();

    const result = mapTreeToTreeProps({
      [newId]: {
        id: newId,
        indent: node.indent + 1,
        isCollapsed: false,
        successors: [],
        text: "New Item",
      },
    });

    _state.tree[newId] = result[newId];

    _state.tree[id].successors.push(newId);
  };
