import {
  THierarchicalItem,
  THierarchicalItemProps,
  TItemProps,
} from "../../components/Item/types";
import { EPage, TWithPageType } from "../../types";
import { FC } from "../../libs/react";

export type TOntologyProps = TWithPageType<
  {
    Component?: FC<TOntologyProps>;
    hierarchicalItemProps: THierarchicalItemProps;
    menuProps: TItemProps;
    isLoading: boolean;
    error?: string;
    ItemComponent?: React.FC<THierarchicalItemProps>;
  },
  EPage.Ontology
>;

export type TOntologyState = {
  tree: Record<string, THierarchicalItem>;
  isLoading: boolean;
  error?: string;
};
