import {
  THierarchicalItemProps,
  TItemProps,
} from "../../components/Item/types";
import { EPage, TWithPageType } from "../../types";

export type TOntologyProps = TWithPageType<
  {
    tree: Record<string, THierarchicalItemProps>;
    menuProps: TItemProps;
    isLoading: boolean;
    error?: string;
  },
  EPage.Ontology
>;
