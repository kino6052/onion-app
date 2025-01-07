import { ontologies } from "../getOntologies/data";
import { TSaveOntology } from "./types";

export const saveOntology: TSaveOntology = async (id, ontology, isRemote) => {
  ontologies[id] = ontology;
};
