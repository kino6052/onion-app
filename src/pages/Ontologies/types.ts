import {
  TIsLoadingState,
  TMessageState,
  TPromptState,
  TWithComponent,
  TWithNotificationProps,
} from "../../types";
import {
  THierarchicalItem,
  TItem,
  TItemProps,
} from "../../components/Item/types";
import { TMenuProps } from "../../components/Menu/types";
import { TGetOntology } from "../../dependencies/getOntology/types";
import { TGetUniqueId } from "../../dependencies/getUniqueId/types";
import { TLogout } from "../../dependencies/logout/types";
import { TRemoveOntology } from "../../dependencies/removeOntology/types";
import { TSaveOntology } from "../../dependencies/hierarchy/ontology/saveOntology/types";
import { FC } from "../../libs/react";

export type TOntologiesPurePropsBase = Partial<TWithNotificationProps> &
  TIsLoadingState &
  Partial<TMessageState> & {
    menuProps: TItemProps;
  } & { ontologiesProps: TItemProps[] };

export type TOntologiesProps = TWithComponent<TOntologiesPurePropsBase> &
  TOntologiesPurePropsBase;

export type TExtendedItem = TItem &
  Partial<{ isMenuOpen: boolean }> &
  Partial<TPromptState>;

export type TOntologiesState = {
  list: TExtendedItem[];
};

export type TOntologiesDependencies = {
  Menu: FC<TMenuProps>;
  logout: TLogout;
  getOntology: TGetOntology;
  getUniqueId: TGetUniqueId;
  saveOntology: TSaveOntology;
  removeOntology: TRemoveOntology;
};

export type TOntology = {
  name: string;
  map?: Record<string, THierarchicalItem>;
};
