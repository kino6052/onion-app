import { TItem } from "../../ui/components/Item/types";

export type TLoginResponse = {
  error?: string;
  ontologies?: TItem[];
};

export type TLogin = () => Promise<TLoginResponse>;
