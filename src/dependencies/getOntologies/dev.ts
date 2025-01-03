import { TGetOntologies } from "./types";

export const getOntologies: TGetOntologies = async () => {
  const response = await fetch("http://localhost:3000/ontologies");

  if (!response.ok) {
    throw new Error("Failed to fetch ontologies");
  }

  const ontologies = await response.json();

  return ontologies;
};
