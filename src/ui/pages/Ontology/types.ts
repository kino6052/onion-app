import { TItemProps } from "../../components/Item/types";
import { EPage, TWithPageType } from "../../types";

export type TOntologyProps = TWithPageType<
  {
    tree: Record<string, TItemProps>;
    menuProps: TItemProps;
  },
  EPage.Ontology
>;
