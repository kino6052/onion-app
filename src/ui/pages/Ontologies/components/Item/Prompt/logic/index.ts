import { TAppState, TSetState } from "../../../../../../../types";
import {
  closeOntologyItemPrompt,
  updateOntologyItemPromptField,
} from "./prompt.domain";
import { applyPrompt } from "./appyPrompt.case";
import { TExtendedItem, TOntologiesDependencies } from "../../../../types";

export const mapItemToItemPromptProps = (
  setState: TSetState<TAppState>,
  item: TExtendedItem,
  dependencies: TOntologiesDependencies
) =>
  !item.promptState
    ? undefined
    : {
        isNotificationOnly: !!item.promptState.isNotificationOnly,
        buttonProps: {
          onClick: () => applyPrompt(setState, item, dependencies),
          children: "Apply",
        },
        title: item.promptState.type === "remove" ? "Remove" : "Rename",
        textProps: {
          isDisabled: false,
          onChange: (value: string) =>
            updateOntologyItemPromptField(setState, item.id, value),
          placeholder: "Placeholder",
          value: item.promptState?.text ?? "",
        },
        cancelButtonProps: {
          onClick: () => closeOntologyItemPrompt(setState, item.id),
          children: "Cancel",
        },
      };
