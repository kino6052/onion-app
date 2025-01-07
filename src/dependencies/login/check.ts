import { getOntologies } from "../getOntologies/check";
import { TLogin } from "./types";

export const login: TLogin = async () => ({
  ontologies: await getOntologies(),
});
