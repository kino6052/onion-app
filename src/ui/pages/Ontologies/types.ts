import {
  TItem,
  TItemProps,
  TWithPromptProps,
} from "../../components/Item/types";
import { TMenuProps } from "../../components/Menu/types";
import { TGetOntology } from "../../dependencies/getOntology/types";
import { TGetUniqueId } from "../../dependencies/getUniqueId/types";
import { TLogout } from "../../dependencies/logout/types";
import { TRemoveOntology } from "../../dependencies/removeOntology/types";
import { TSaveOntology } from "../../dependencies/saveOntology/types";
import { FC } from "../../libs/react";
import {
  TIsLoadingState,
  TMessageState,
  TPromptState,
  TWithComponent,
  TWithNotificationProps,
} from "../../../types";

export type TOntologiesPurePropsBase = Partial<TWithNotificationProps> &
  TIsLoadingState &
  Partial<TMessageState> & {
    menuProps: TItemProps;
  } & { ontologiesProps: TItemProps[] };

export type TOntologiesProps = TWithComponent<TOntologiesPurePropsBase> &
  TOntologiesPurePropsBase;

export type TOntologiesState = {
  list: (TItem & Partial<{ isMenuOpen: boolean }> & Partial<TPromptState>)[];
};

export type TOntologiesDependencies = {
  Menu: FC<TMenuProps>;
  logout: TLogout;
  getOntology: TGetOntology;
  getUniqueId: TGetUniqueId;
  saveOntology: TSaveOntology;
  removeOntology: TRemoveOntology;
};
