import { noop } from "../../../../utils";
import { EMenuConstant } from "./constants";

export const getDefaultMenuProps = (id: string) => ({
  // Move into menu
  id,
  itemsProps: [
    {
      id: EMenuConstant.Remove,
      onClick: noop,
      onMenuClick: noop,
      text: "Remove",
    },
    {
      id: EMenuConstant.Add,
      onClick: noop,
      onMenuClick: noop,
      text: "Add New Item",
    },
  ],
  onBackgroundClick: noop,
  isOpen: false,
});
