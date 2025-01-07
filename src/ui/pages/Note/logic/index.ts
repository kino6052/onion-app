import { EConstant } from "../../../../constants";
import { TItemProps } from "../../../components/Item/types";
import { TGetUniqueId } from "../../../../dependencies/getUniqueId/types";
import {
  EPage,
  TAppState,
  TMapStateToProps,
  TNotePageProps,
  TNotePageState,
  TSetState,
} from "../../../../types";
import { noop } from "../../../../utils";
import { setPartial } from "../../../utils/setPartial";
import { TNoteProps } from "../types";
import { getMapStateToItemProps } from "./menu";
import { getMapStateToWordTreeProps } from "./word";

const mapStateToNotificationProps = (state: TNotePageState) =>
  state.pageState.hasError
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
    : undefined;

export const getMapStateToProps =
  ({
    getUniqueId,
    mapStateToItemProps,
  }: {
    getUniqueId: TGetUniqueId;
    mapStateToItemProps: TMapStateToProps<TAppState<EPage.Note>, TItemProps>;
  }): TMapStateToProps<TAppState<EPage.Note>, TNotePageProps> =>
  (state: TNotePageState, setState: TSetState<TAppState>) => {
    return {
      pageProps: {
        isLoading: state.pageState.isLoading,
        itemProps: mapStateToItemProps(state, setState),
        wordTreeProps: getMapStateToWordTreeProps({ getUniqueId })(
          state,
          setState
        ),
        notificationProps: mapStateToNotificationProps(state),
        editTextPrompt: !state.pageState.textEditPrompt
          ? undefined
          : {
              buttonProps: {
                onClick: () => {
                  setState((prev) => {
                    if (prev.pageType !== EPage.Note)
                      throw new Error("Not note page");
                    return {
                      ...prev,
                      pageState: {
                        ...prev.pageState,
                        textEditPrompt: undefined,
                        wordTree: {
                          ...prev.pageState.wordTree,
                          [EConstant.Root]: {
                            ...prev.pageState.wordTree[EConstant.Root],
                            open: prev.pageState.textEditPrompt?.text ?? "",
                          },
                        },
                      },
                    };
                  });
                },
                children: "Apply",
              },
              description: "Edit text",
              onBackgrounClick: () => {},
              title: "Edit text",
              cancelButtonProps: {
                onClick: () => {
                  setState((prev) => {
                    if (prev.pageType !== EPage.Note)
                      throw new Error("Not note page");
                    return {
                      ...prev,
                      pageState: {
                        ...prev.pageState,
                        textEditPrompt: undefined,
                      },
                    };
                  });
                },
                children: "Cancel",
              },
              textProps: {
                placeholder: "Enter text",
                value: state.pageState.textEditPrompt.text,
                isDisabled: false,
                onChange: (input) => {
                  setPartial(
                    {
                      pageState: {
                        textEditPrompt: {
                          text: input,
                        },
                      },
                    },
                    setState,
                    EPage.Note
                  );
                },
              },
            },
      } satisfies TNoteProps,
      pageType: EPage.Note,
    };
  };
