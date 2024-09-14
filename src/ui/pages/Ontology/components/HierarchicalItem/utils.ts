import { TPromptProps } from "../../../../components/Prompt/types";
import { noop } from "../../../../utils";

export const getInitialRenamePromptProps = (): TPromptProps => ({
  buttonProps: {
    hasIcon: true,
    onClick: noop,
    children: "Submit",
  },
  description: "Enter a new name",
  textProps: {
    onChange: noop,
    placeholder: "Enter a new name",
    value: "",
  },
  title: "Rename",
});
