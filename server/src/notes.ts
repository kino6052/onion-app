import { TSerializedWord } from "../../src/ui/pages/Note/types";
import { EConstant } from "../../src/constants";
import { BRANCH_NAME, REPO_NAME } from "./constants";
import { router } from "./router";
import {
  createNewFile,
  getFileContentById,
  getFilesStartingWith,
} from "./utils/file";
import { cleanUpId } from "./utils/utils";

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

router.on("POST", "/note", async (req) => {
  const newNote: { id: string; note: Record<string, TSerializedWord> } =
    await req.json();

  const id = cleanUpId(newNote.id, "note-");

  if (!id) {
    throw new Error("No id provided");
  }

  if (!newNote.note) throw new Error("No note provided");

  await createNewFile(
    REPO_NAME,
    BRANCH_NAME,
    `note-${id}`,
    JSON.stringify(newNote.note),
    `Add new note ${id}`
  );

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
});

router.on("GET", "/notes/:id", async (req, { id: _id }) => {
  const id = `note-${cleanUpId(_id, "note-")}`;

  let fileContentString;

  fileContentString = (
    await getFileContentById("ontology-repo", "new-branch", id)
  )?.toString();

  if (!fileContentString) {
    fileContentString = JSON.stringify({
      [EConstant.Root]: {
        closed: EConstant.Root,
        id: EConstant.Root,
        open: "Default text",
      } as TSerializedWord,
    });

    await createNewFile(
      REPO_NAME,
      BRANCH_NAME,
      id,
      fileContentString,
      `Create or update note ${id}`
    );
  }

  return new Response(fileContentString, {
    headers: { "Content-Type": "application/json" },
  });
});
