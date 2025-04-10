import { ontologies } from "../../../hierarchy/getOntologies/data";
import { TRemoveOntology } from "./types";

export const removeOntology: TRemoveOntology = async (id) => {
  delete ontologies[id];
};
