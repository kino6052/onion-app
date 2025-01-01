import { THierarchicalItem } from "../../components/Item/types";

export type TGetOntology = () => Promise<Record<string, THierarchicalItem>>;
