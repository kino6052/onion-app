import { FC } from "../../../../../../libs/react";
import { TAppState, TSetState } from "../../../../../../types";
import { EMenuConstant } from "../../../../../../components/Menu/constants";
import { TMenuProps } from "../../../../../../components/Menu/types";
import { TExtendedItem } from "../../../../types";
import {
  removeOntologyItem,
  renameOntologyItem,
} from "../../logic/item.domain";
import { closeOntologyItemMenu } from "./domain/menu.domain";

export const mapItemToItemMenuProps = (
  setState: TSetState<TAppState>,
  dependencies: { Menu: FC<TMenuProps> },
  item: TExtendedItem
) => ({
  id: "menu",
  itemsProps: [
    {
      id: EMenuConstant.Rename,
      onClick: () => renameOntologyItem(setState, item.id),
      text: "Rename",
    },
    {
      id: EMenuConstant.Remove,
      onClick: () => removeOntologyItem(setState, item.id),
      text: "Remove",
    },
  ],
  Component: dependencies.Menu,
  onBackgroundClick: () => closeOntologyItemMenu(setState, item.id),
  isOpen: item.isMenuOpen,
});
