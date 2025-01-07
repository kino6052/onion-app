import { ENDPOINT } from "../common/constants";
import { TGetOntologies } from "./types";

export const getOntologies: TGetOntologies = async () => {
  const response = await fetch(`${ENDPOINT}/ontologies`);

  if (!response.ok) {
    throw new Error("Failed to fetch ontologies");
  }

  const ontologies = await response.json();

  return ontologies;
};
