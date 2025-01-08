import { TOntology } from "../../pages/Ontologies/types";

export type TGetOntology = (id: string) => Promise<TOntology>;
