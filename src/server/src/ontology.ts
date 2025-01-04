import { TOntology } from "../../ui/pages/Ontologies/types";
import { BRANCH_NAME, NAME_MAPPING_FILE, REPO_NAME } from "./constants";
import { router } from "./router";
import {
  createNewFile,
  deleteFileByName,
  ensureFileExists,
  getFileContentById,
  getFilesStartingWith,
} from "./utils/file";
import { addNameMapping } from "./utils/utils";

router.on("GET", "/ontologies", async () => {
  const ontologies = await getFilesStartingWith(
    REPO_NAME,
    BRANCH_NAME,
    "ontology-"
  );

  await ensureFileExists(
    REPO_NAME,
    BRANCH_NAME,
    NAME_MAPPING_FILE,
    "{}",
    "Initial name mapping"
  );

  const _nameMap = await getFileContentById(
    REPO_NAME,
    BRANCH_NAME,
    NAME_MAPPING_FILE
  );

  const nameMap: Record<string, unknown> = JSON.parse(
    _nameMap?.toString() ?? "{}"
  );

  const ontologiesData = ontologies?.filter(Boolean).map((o) => {
    return {
      id: o,
      text: (o && nameMap?.[o]) ?? "New Ontology",
    };
  });

  return new Response(JSON.stringify(ontologiesData), {
    headers: { "Content-Type": "application/json" },
  });
});

router.on("GET", "/ontology/:id", async (req, { id }) => {
  const fileContent = await getFileContentById(REPO_NAME, BRANCH_NAME, id);
  return new Response(fileContent?.toString(), {
    headers: { "Content-Type": "application/json" },
  });
});

router.on("DELETE", "/ontology/:id", async (req, { id }) => {
  await deleteFileByName(REPO_NAME, BRANCH_NAME, id, `Delete ontology ${id}`);

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
});

const cleanUpId = (id: string) =>
  id.replace(new RegExp("(ontology-)+", "g"), "");

router.on("POST", "/ontology", async (req) => {
  const newOntology: { id: string; ontology: TOntology } = await req.json();

  const id = cleanUpId(newOntology.id);

  if (!id) {
    throw new Error("No id provided");
  }

  if (newOntology.ontology.map) {
    await createNewFile(
      REPO_NAME,
      BRANCH_NAME,
      `ontology-${id}`,
      JSON.stringify(newOntology),
      "Add new ontology"
    );
  }

  await addNameMapping(
    REPO_NAME,
    BRANCH_NAME,
    `ontology-${id}`,
    newOntology.ontology.name ?? "New Ontology"
  );

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
