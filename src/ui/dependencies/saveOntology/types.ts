import { TOntology } from "../../pages/Ontologies/types";

export type TSaveOntology = (
  id: string,
  ontology: TOntology,
  isRemote?: boolean
) => Promise<void>;
