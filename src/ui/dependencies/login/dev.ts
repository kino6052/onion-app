import { getOntology } from "../getOntology/dev";
import { TLogin } from "./types";

export const login: TLogin = async () => ({
  ontology: await getOntology(),
});
