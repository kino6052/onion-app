import { ENDPOINT } from "../../../common/constants";
import { TSaveOntology } from "./types";

export const saveOntology: TSaveOntology = async (id, ontology) => {
  const response = await fetch(`${ENDPOINT}/ontology`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, ontology }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch ontologies");
  }

  const ontologies = await response.json();

  return ontologies;
};
