import { THierarchicalItem } from "../../components/Item/types";

export type TSaveOntology = (
  id: string,
  ontology: Record<string, THierarchicalItem>,
  isRemote?: boolean
) => Promise<void>;
