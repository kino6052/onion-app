import { TRemoveOntology } from "./types";

export const removeOntology: TRemoveOntology = async (id) => {
  const response = await fetch(`http://localhost:3000/ontology/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to remove ontology ${id}`);
  }
};
