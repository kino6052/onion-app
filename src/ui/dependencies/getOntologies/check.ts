import { ontologies } from "./data";
import { TGetOntologies } from "./types";

export const getOntologies: TGetOntologies = async () => {
  return Object.entries(ontologies).map(([id, o]) => ({
    id,
    text: o.name,
  }));
};
