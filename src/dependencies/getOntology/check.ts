import { ontologies } from "../getOntologies/data";
import { TGetOntology } from "./types";

export const getOntology: TGetOntology = async (id: string) => {
  const ontology = ontologies[id];

  if (!ontology) throw new Error("No ontology found");

  return ontology;
};
