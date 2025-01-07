import { TOntology } from "../../ui/pages/Ontologies/types";

export type TGetOntology = (id: string) => Promise<TOntology>;
