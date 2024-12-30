import { EConstant } from "../../../constants";
import { Menu } from "../../components/Menu";
import { TTextProps } from "../../components/Text/types";
import { TWordProps } from "../../components/Word/types";
import {
  EPage,
  TAppState,
  TMapStateToProps,
  TNotePageProps,
  TNotePageState,
  TSetState,
} from "../../types";
import { noop } from "../../utils";
import { setPartial } from "../../utils/setPartial";
import { EMenuConstant } from "./components/Word/types";
import { getDefaultMenuProps } from "./components/Word/utils";
import { TNoteProps } from "./types";
import { deserializeNote } from "./utils/tree";

export const mapStateToWordTreeProps = (
  state: TNotePageState,
  setState: TSetState<TAppState>,
  currentId: string = EConstant.Root
): TWordProps => {
  const { wordTree: _wordTree } = state.pageState;

  const wordTree = deserializeNote(_wordTree[currentId], _wordTree);

  const { closed, id, isCollapsed, open, isEndIndexConfirmed } = wordTree;

  return {
    id,
    isCollapsible: open.length > 0,
    childrenProps: open.map((word, i) => {
      if (word instanceof Object) {
        return mapStateToWordTreeProps(state, setState, word.id);
      }
      return {
        onClick: () => {
          const word = _wordTree[id];
          if (!word) throw new Error(`No word with id "${id}"`);

          const [index] = word.range?.filter((v) => v !== undefined) ?? [];

          if (index !== undefined) {
            alert("Here");
            const newStuff = open.slice(index, i + 1);

            setPartial(
              {
                pageState: {
                  wordTree: {
                    [id]: {
                      open: [
                        ...open.slice(0, index),
                        "{{test}}",
                        ...open.slice(i + 1),
                      ].join(" "),
                      range: [undefined, undefined],
                    },
                    ["test"]: {
                      id: "test",
                      closed: "TEST!",
                      isCollapsed: true,
                      open: newStuff.join(" "),
                    },
                  },
                },
              },
              setState,
              EPage.Note
            );

            return;
          }

          setPartial(
            {
              pageState: {
                wordTree: {
                  [id]: {
                    range: [i, undefined],
                  },
                },
              },
            },
            setState,
            EPage.Note
          );
        },
        onMouseOver: () => {},
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
    onMenuClick: () => {
      setPartial(
        {
          pageType: EPage.Note,
          pageState: {
            wordTree: {
              ..._wordTree,
              [id]: {
                ..._wordTree[id],
                isCollapsed: !_wordTree[id].isCollapsed,
              },
            },
          },
        },
        setState,
        EPage.Note
      );
    },
    text: closed,
    isOpen: !isCollapsed,
    promptProps: state.pageState.wordTree.promptState && {
      title: "Edit",
      buttonProps: {
        onClick: noop,
        hasIcon: false,
      },
      description: "Edit the word",
      textProps: {
        isDisabled: false,
        onChange: noop,
        placeholder: "Edit the word",
        value: wordTree.promptState?.text ?? "",
      },
      cancelButtonProps: {
        onClick: noop,
        hasIcon: false,
      },
      onBackgrounClick: () => {},
    },
    menuProps: state.pageState.wordTree.isMenuOpen
      ? getDefaultMenuProps(id)
      : undefined,
  } satisfies TWordProps;
};

export const getMapStateToProps =
  (): TMapStateToProps<TAppState<EPage.Note>, TNotePageProps> =>
  (state: TNotePageState, setState: TSetState<TAppState>) => {
    return {
      pageProps: {
        isLoading: state.pageState.isLoading,
        itemProps: {
          id: state.pageState.id,
          onClick: noop,
          onMenuClick: () => {
            setPartial(
              {
                pageState: {
                  isMenuOpen: true,
                },
              },
              setState,
              EPage.Note
            );
          },
          text: "Test",
          menuProps: {
            id: "menu",
            Component: Menu,
            itemsProps: [
              {
                id: EMenuConstant.Edit,
                onClick: () => {
                  setState((prev) => ({
                    pageState: {
                      isLoading: false,
                    },
                    pageType: EPage.Login,
                  }));
                },
                text: "Go back",
              },
            ],
            onBackgroundClick: noop,
            isOpen: state.pageState.isMenuOpen,
          },
        },
        wordTreeProps: mapStateToWordTreeProps(state, setState),
        notificationProps: state.pageState.hasError
          ? {
              buttonProps: {
                onClick: noop,
                children: "OK",
              },
              description: state.pageState.message ?? "An error occurred",
              onBackgrounClick: noop,
              title: "Error",
              isNotificationOnly: true,
            }
          : undefined,
      } satisfies TNoteProps,
      pageType: EPage.Note,
    };
  };
