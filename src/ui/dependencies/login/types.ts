import { THierarchicalItem } from "../../components/Item/types";

export type TLoginResponse = {
  error?: string;
  ontology?: Record<string, THierarchicalItem>;
};

export type TLogin = () => Promise<TLoginResponse>;
