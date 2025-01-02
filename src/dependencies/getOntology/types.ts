import { THierarchicalItem } from "../../components/Item/types";

export type TGetOntology = (
  id: string
) => Promise<Record<string, THierarchicalItem>>;
