import { TItem } from "../../components/Item/types";

export type TLoginResponse = {
  error?: string;
  ontologies?: TItem[];
};

export type TLogin = () => Promise<TLoginResponse>;
