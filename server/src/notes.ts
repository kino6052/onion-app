import { TSerializedWord } from "../../src/pages/Note/types";
import { EConstant } from "../../src/constants";
import { BRANCH_NAME, REPO_NAME } from "./constants";
import { router } from "./router";
import {
  createNewFile,
  getFileContentById,
  getFilesStartingWith,
} from "./utils/file";
import { cleanUpId } from "./utils/utils";

const PREFIX = "note-";

router.on("GET", "/notes", async (req) => {
  const notes = await getFilesStartingWith(REPO_NAME, BRANCH_NAME, PREFIX);
  return new Response(JSON.stringify(notes), {
    headers: { "Content-Type": "application/json" },
  });
});

router.on("POST", "/note", async (req) => {
  const newNote: { id: string; note: Record<string, TSerializedWord> } =
    await req.json();

  const id = cleanUpId(newNote.id, PREFIX);

  if (!id) {
    throw new Error("No id provided");
  }

  if (!newNote.note) throw new Error("No note provided");

  await createNewFile(
    REPO_NAME,
    BRANCH_NAME,
    `${PREFIX}${id}`,
    JSON.stringify(newNote.note),
    `Add new note ${id}`
  );

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
});

router.on("GET", "/notes/:id", async (req, { id: _id }) => {
  const id = `${PREFIX}${cleanUpId(_id, PREFIX)}`;

  let fileContentString;

  fileContentString = (
    await getFileContentById(REPO_NAME, BRANCH_NAME, id)
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
