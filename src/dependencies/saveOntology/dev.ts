import { wait } from "../../utils";
import { ontologies } from "../getOntologies/data";
import { TSaveOntology } from "./types";

export const saveOntology: TSaveOntology = async (id, ontology, isRemote) => {
  await wait(1000);

  ontologies[id] = ontology;
};
