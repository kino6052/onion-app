import { EMenuConstant } from "./types";
import { TItemProps } from "../../../../components/Item/types";
import { TPromptProps } from "../../../../components/Prompt/types";
import { noop } from "../../../../utils";

export const getMenuItemById = (id: EMenuConstant, items: TItemProps[]) =>
  items.find(({ id: _id }) => _id === id);

export const getDefaultMenuProps = (id: string) => ({
  // Move into menu
  id,
  itemsProps: [
    {
      id: EMenuConstant.Edit,
      onClick: noop,
      onMenuClick: noop,
      text: "Edit",
    },
    {
      id: EMenuConstant.Remove,
      onClick: noop,
      onMenuClick: noop,
      text: "Remove",
    },
  ],
  onBackgroundClick: noop,
  isOpen: false,
});

export const getDefaultPromptProps = ({
  title = "Prompt",
  description = "Please provide data",
  placeholder = "Value",
  submitText = "Submit",
}: Partial<{
  title: string;
  description: string;
  placeholder: string;
  submitText: string;
}>): TPromptProps => ({
  buttonProps: {
    hasIcon: false,
    onClick: noop,
    children: submitText,
    isDisabled: true,
  },
  description,
  textProps: {
    onChange: noop,
    placeholder,
    value: "",
    isDisabled: true,
  },
  title,
});
