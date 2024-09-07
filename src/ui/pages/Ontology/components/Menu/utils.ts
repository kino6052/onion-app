import { TItemProps } from "../../../../components/Item/types";
import { noop } from "../../../../utils";
import { EMenuConstant } from "./constants";

export const getMenuItemById = (id: EMenuConstant, items: TItemProps[]) =>
  items.find(({ id: _id }) => _id === id);

export const getDefaultMenuProps = (id: string) => ({
  // Move into menu
  id,
  itemsProps: [
    {
      id: EMenuConstant.Rename,
      onClick: noop,
      onMenuClick: noop,
      text: "Rename",
    },
    {
      id: EMenuConstant.Add,
      onClick: noop,
      onMenuClick: noop,
      text: "Add New Item",
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
