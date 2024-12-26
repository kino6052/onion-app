import {
  THierarchicalItem,
  THierarchicalItemProps,
  TItemProps,
} from "../../components/Item/types";
import { EPage, TPageTypeState, TWithComponent } from "../../types";
import { TIsLoadingState, TMessageState } from "../../types";

export type TOntologyPurePropsBase = TIsLoadingState &
  Partial<TMessageState> & {
    hierarchicalItemProps: THierarchicalItemProps;
    menuProps: TItemProps;
  };

export type TOntologyPurePropsWithComponent = TOntologyPurePropsBase & {
  ItemComponent?: React.FC<THierarchicalItemProps>;
};

export type TOntologyPureProps = TPageTypeState<EPage.Ontology> &
  TOntologyPurePropsWithComponent;

export type TOntologyProps = TWithComponent<TOntologyPureProps> &
  TOntologyPureProps;

export type TOntologyState = {
  tree: Record<string, THierarchicalItem>;
} & TIsLoadingState &
  Partial<TMessageState>;
