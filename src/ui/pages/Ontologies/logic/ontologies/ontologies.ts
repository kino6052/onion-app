import {
  closeOntologyItemMenu,
  closeOntologyItemPrompt,
  openItemMenu,
  removeOntologyItem,
  renameOntologyItem,
  updateOntologyItemPromptField,
} from "../../../../../domain/ontologies";
import { applyPrompt } from "../../../../../domain/ontologies/useCases/appyPrompt";
import { getOntologies } from "../../../../../domain/ontologies/useCases/getOntologies";
import {
  TAppState,
  TOntologiesPageState,
  TSetState,
} from "../../../../../types";
import { TItemProps } from "../../../../components/Item/types";
import { EMenuConstant } from "../../../../components/Menu/constants";
import { TMenuProps } from "../../../../components/Menu/types";
import { FC } from "../../../../../libs/react";
import { TExtendedItem, TOntologiesDependencies } from "../../types";

const createItemMenuProps = (
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

const createItemPromptProps = (
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

export const mapStateToOntologiesProps = (
  setState: TSetState<TAppState>,
  dependencies: TOntologiesDependencies,
  state: TOntologiesPageState
) =>
  state.pageState.list.map(
    (item) =>
      ({
        ...item,
        menuProps: createItemMenuProps(setState, dependencies, item),
        onClick: () => getOntologies(item, setState, dependencies),
        onMenuClick: () => openItemMenu(setState, item.id),
        promptProps: createItemPromptProps(setState, item, dependencies),
      }) as TItemProps
  );
