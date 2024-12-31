import { THierarchicalItem } from "../../components/Item/types";

export type TSaveOntology = (
  ontology: Record<string, THierarchicalItem>,
  isRemote?: boolean
) => Promise<void>;
