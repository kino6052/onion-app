import { TTextProps } from "../../../../components/Text/types";
import { TWordProps } from "../../../../components/Word/types";
import { EConstant } from "../../../../../constants";
import { TGetUniqueId } from "../../../../../dependencies/getUniqueId/types";
import { TAppState, TNotePageState, TSetState } from "../../../../../types";
import { getDefaultMenuProps } from "../../components/Word/utils";
import { removeNodeFromWordTree, updateWordProperties } from "../../utils";
import { deserializeNote } from "../../utils/tree";
import { handleMenuClick } from "../menu";
import { getMapStateToPromptProps } from "./prompt";
import { getHandleWordClick } from "./text";

export const getMapStateToWordTreeProps =
  ({ getUniqueId }: { getUniqueId: TGetUniqueId }) =>
  (
    state: TNotePageState,
    setState: TSetState<TAppState>,
    currentId: string = EConstant.Root
  ): TWordProps => {
    const { wordTree: _wordTree } = state.pageState;

    const wordTree = deserializeNote(_wordTree[currentId], _wordTree);

    const { closed, id, isCollapsed, open } = wordTree;

    return {
      id,
      isCollapsible: open.length > 0,
      childrenProps: open.map((word, i) => {
        if (word instanceof Object) {
          return getMapStateToWordTreeProps({ getUniqueId })(
            state,
            setState,
            word.id
          );
        }
        return {
          onClick: () =>
            getHandleWordClick({
              getUniqueId,
              id,
              i,
              setState,
              wordTree: _wordTree,
            }),
          onMouseOver: () => {
            const [start] = wordTree.range ?? [];
            if (typeof start === "number") {
              updateWordProperties(
                id,
                {
                  range: [start, i],
                },
                setState
              );
            }
          },
          children: word,
          isSelected:
            wordTree.range &&
            ((typeof wordTree.range[0] === "number" &&
              typeof wordTree.range[1] === "number" &&
              i >= wordTree.range[0] &&
              i <= wordTree.range[1]) ||
              wordTree.range[0] === i),
        } as TTextProps;
      }),
      onClick: () => {
        updateWordProperties(
          id,
          {
            editedName: closed,
            isEditing: true,
          },
          setState
        );
      },
      onMenuClick: () => handleMenuClick(id, _wordTree, setState),
      text: closed,
      isOpen: !isCollapsed,
      promptProps:
        state.pageState.wordTree.promptState &&
        getMapStateToPromptProps(wordTree)(state, setState),
      menuProps: wordTree.isMenuOpen ? getDefaultMenuProps(id) : undefined,
      editProps: !wordTree.isEditing
        ? undefined
        : {
            removeButtonProps: {
              children: "🗑️",
              onClick: () => {
                removeNodeFromWordTree(wordTree.id, setState);
              },
            },
            rejectButtonProps: {
              children: "❌",
              onClick: () => {
                updateWordProperties(
                  wordTree.id,
                  {
                    isEditing: false,
                    editedName: undefined,
                  },
                  setState
                );
              },
            },
            confirmButtonProps: {
              children: "✅",
              onClick: () => {
                updateWordProperties(
                  wordTree.id,
                  {
                    isEditing: false,
                    editedName: undefined,
                    closed: wordTree.editedName,
                  },
                  setState
                );
              },
            },
            inputProps: {
              value: wordTree.editedName,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                updateWordProperties(
                  wordTree.id,
                  {
                    editedName: e.target.value,
                  },
                  setState
                );
              },
            },
          },
    } satisfies TWordProps;
  };
