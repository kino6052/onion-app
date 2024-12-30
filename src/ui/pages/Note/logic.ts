import { TTextProps } from "../../components/Text/types";
import { TWordProps } from "../../components/Word/types";
import {
  EPage,
  TAppProps,
  TAppState,
  TNotePageState,
  TSetState,
} from "../../types";
import { noop } from "../../utils";
import { getDefaultMenuProps } from "./components/Word/utils";
import { TNoteProps } from "./types";

export const mapStateToWordTreeProps = (
  state: TNotePageState,
  setState: TSetState<TAppState>
): TWordProps => {
  const { wordTree } = state.pageState;
  const { closed, id, isCollapsed, open } = wordTree;

  return {
    id,
    isCollapsible: open.length > 0,
    childrenProps: open.map((word, i) => {
      if (word instanceof Object) {
        return mapStateToWordTreeProps(
          {
            pageType: EPage.Note,
            pageState: { ...state.pageState, wordTree: word },
          },
          setState
        );
      }
      return {
        children: word,
        isSelected:
          wordTree.range && i >= wordTree.range[0] && i <= wordTree.range[1],
      } as TTextProps;
    }),
    onClick: noop,
    onMenuClick: noop,
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
        value: state.pageState.wordTree.promptState.text,
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
  () =>
  (state: TNotePageState, setState: TSetState<TAppState>): TAppProps => {
    return {
      pageProps: {
        isLoading: state.pageState.isLoading,
        itemProps: {
          id: state.pageState.id,
          onClick: noop,
          onMenuClick: noop,
          text: "",
          menuProps: getDefaultMenuProps(state.pageState.id),
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
