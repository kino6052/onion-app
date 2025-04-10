import { TOntology } from "../../../../pages/Ontologies/types";
import { ENDPOINT } from "../../../common/constants";
import { TGetOntology } from "./types";

export const getOntology: TGetOntology = async (id: string) => {
  const response = await fetch(`${ENDPOINT}/ontology/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch ontology");
  }

  const ontology: TOntology = await response.json();

  if (!ontology) throw new Error("No ontology found");

  return ontology;
};
