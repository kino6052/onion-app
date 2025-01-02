import {
  THierarchicalItem,
  THierarchicalItemProps,
  TItemProps,
} from "../../components/Item/types";
import {
  TIsLoadingState,
  TMessageState,
  TWithComponent,
  TWithNotificationProps,
} from "../../types";

export type TOntologyPurePropsBase = Partial<TWithNotificationProps> &
  TIsLoadingState &
  Partial<TMessageState> & {
    hierarchicalItemProps: THierarchicalItemProps;
    menuProps: TItemProps;
  };

export type TOntologyPurePropsWithComponent = TOntologyPurePropsBase & {
  ItemComponent?: React.FC<THierarchicalItemProps>;
};

export type TOntologyPureProps = TOntologyPurePropsWithComponent;

export type TOntologyProps = TWithComponent<TOntologyPureProps> &
  TOntologyPureProps;

export type TOntologyState = {
  tree: Record<string, THierarchicalItem>;
};
