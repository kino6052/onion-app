import { noop } from "rxjs";
import { THierarchicalItem } from "../../../../../components/Item/types";
import { EPage, TAppState, TSetState } from "../../../../../types";
import { updateNodeProperties } from "../utils";
import { setPartial } from "../../../../../utils/setPartial";
import { TPromptProps } from "../../../../../components/Prompt/types";

export const menuItemRename = (
  node: THierarchicalItem,
  setState: TSetState<TAppState>
) => ({
  id: "rename",
  text: "Rename",
  onClick: () => {
    updateNodeProperties(
      node.id,
      {
        isMenuOpen: false,
        promptState: {
          text: node.text,
        },
      },
      setState
    );
  },
});

export const getPromptProps = (
  node: THierarchicalItem,
  setState: TSetState<TAppState>
): TPromptProps => {
  return {
    buttonProps: {
      onClick: () => {
        updateNodeProperties(
          node.id,
          {
            text: node.promptState?.text ?? "",
            promptState: undefined,
          },
          setState
        );
      },
      children: "Apply",
      hasIcon: false,
    },
    cancelButtonProps: {
      onClick: () => {
        updateNodeProperties(
          node.id,
          {
            promptState: undefined,
          },
          setState
        );
      },
      children: "Cancel",
      hasIcon: false,
    },
    description: "Type new text",
    onBackgrounClick: () => {
      updateNodeProperties(
        node.id,
        {
          promptState: undefined,
        },
        setState
      );
    },
    textProps: {
      value: node.promptState?.text ?? "",
      onChange: (value: string) => {
        updateNodeProperties(
          node.id,
          {
            promptState: {
              text: value ?? "",
            },
          },
          setState
        );
      },
      isDisabled: false,
      placeholder: "Type new text",
    },
    title: "Edit node",
  };
};
