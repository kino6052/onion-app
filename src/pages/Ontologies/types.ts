import {
  TItem,
  TItemProps,
  TWithPromptProps,
} from "../../components/Item/types";
import {
  TIsLoadingState,
  TMessageState,
  TPromptState,
  TWithComponent,
  TWithNotificationProps,
} from "../../types";

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
