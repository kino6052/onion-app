import { getOntologies } from "../hierarchy/getOntologies/dev";
import { TLogin } from "./types";

export const login: TLogin = async () => ({
  ontologies: await getOntologies(),
});
