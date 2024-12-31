import { EConstant } from "../../../../../constants";
import { TTextProps } from "../../../../components/Text/types";
import { TWordProps } from "../../../../components/Word/types";
import { TGetUniqueId } from "../../../../dependencies/getUniqueId/types";
import { TAppState, TNotePageState, TSetState } from "../../../../types";
import { noop } from "../../../../utils";
import { getDefaultMenuProps } from "../../components/Word/utils";
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
          onMouseOver: noop,
          children: word,
          isSelected:
            wordTree.range &&
            wordTree.range[0] !== undefined &&
            wordTree.range[1] !== undefined &&
            wordTree.range &&
            i >= wordTree.range[0] &&
            i <= wordTree.range[1],
        } as TTextProps;
      }),
      onClick: noop,
      onMenuClick: () => handleMenuClick(id, _wordTree, setState),
      text: closed,
      isOpen: !isCollapsed,
      promptProps:
        state.pageState.wordTree.promptState &&
        getMapStateToPromptProps(wordTree)(state, setState),
      menuProps: wordTree.isMenuOpen ? getDefaultMenuProps(id) : undefined,
    } satisfies TWordProps;
  };
