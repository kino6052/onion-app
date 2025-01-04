import { router } from "./router";
import {
  createNewFile,
  getFileContentById,
  getFilesStartingWith,
} from "./utils/file";

router.on("GET", "/notes", async (req) => {
  const notes = await getFilesStartingWith(
    "ontology-repo",
    "new-branch",
    "note-"
  );
  return new Response(JSON.stringify(notes), {
    headers: { "Content-Type": "application/json" },
  });
});

router.on("POST", "/notes/:id", async (req, params) => {
  const newId = params.id || new Date().getTime().toString();
  const body = await req.text().catch((e) => {
    console.error("Failed to read request body:", e);
    return null;
  });
  if (body) {
    await createNewFile(
      "ontology-repo",
      "new-branch",
      `note-${newId}`,
      body,
      "Create new note"
    );
    return new Response(JSON.stringify({ id: newId }), {
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response("Invalid request body", { status: 400 });
  }
});

router.on("GET", "/notes/:id", async (req, { id }) => {
  console.warn({ id });
  const fileContent = await getFileContentById(
    "ontology-repo",
    "new-branch",
    id
  );
  return new Response(fileContent?.toString(), {
    headers: { "Content-Type": "application/json" },
  });
});
