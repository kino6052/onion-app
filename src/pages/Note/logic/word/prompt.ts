import { noop } from "rxjs";
import { TPromptProps } from "../../../../components/Prompt/types";
import { EPage, TAppState, TMapStateToProps } from "../../../../types";
import { TDeserializedWord } from "../../types";

export const getMapStateToPromptProps =
  (
    word: TDeserializedWord
  ): TMapStateToProps<TAppState<EPage.Note>, TPromptProps> =>
  (state, setState) => ({
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
      value: word.promptState?.text ?? "",
    },
    cancelButtonProps: {
      onClick: noop,
      hasIcon: false,
    },
    onBackgrounClick: noop,
  });
