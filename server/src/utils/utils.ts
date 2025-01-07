import { NAME_MAPPING_FILE } from "../constants";
import { createInitialCommit } from "./branch";
import { getFileContent, updateFileContent } from "./file";
import { octokit } from "./octokit";

export const cleanUpId = (id: string, prefix: string) =>
  id.replace(new RegExp(`(${prefix})+`, "g"), "");

export async function ensureRepositoryExists(repoName: string) {
  try {
    const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser();
    const repoExists = repos.some((repo) => repo.name === repoName);

    if (!repoExists) {
      await octokit.rest.repos.createForAuthenticatedUser({
        name: repoName,
      });
      console.log(`Repository "${repoName}" created.`);

      await createInitialCommit(repoName);
    } else {
      console.log(`Repository "${repoName}" already exists.`);
    }
  } catch (error) {
    console.error(`Error ensuring repository exists: ${error.message}`);
  }
}

export async function addNameMapping(
  repoName: string,
  branchName: string,
  id: string,
  name: string
) {
  const filePath = NAME_MAPPING_FILE;
  const commitMessage = `Add mapping for id: ${id}`;

  try {
    const fileContent = await getFileContent(repoName, branchName, filePath);
    const mappings = JSON.parse(fileContent || "{}");
    mappings[id] = name;
    const newContent = JSON.stringify(mappings, null, 2);

    await updateFileContent(
      repoName,
      branchName,
      filePath,
      newContent,
      commitMessage
    );

    console.log(`Mapping for id "${id}" added to "${filePath}".`);
  } catch (error) {
    console.error(`Error adding name mapping: ${error.message}`);
  }
}

export async function removeNameMapping(
  repoName: string,
  branchName: string,
  id: string
) {
  const filePath = NAME_MAPPING_FILE;
  const commitMessage = `Remove mapping for id: ${id}`;

  try {
    const fileContent = await getFileContent(repoName, branchName, filePath);
    const mappings = JSON.parse(fileContent || "{}");

    if (mappings[id]) {
      delete mappings[id];
      const newContent = JSON.stringify(mappings, null, 2);

      await updateFileContent(
        repoName,
        branchName,
        filePath,
        newContent,
        commitMessage
      );

      console.log(`Mapping for id "${id}" removed from "${filePath}".`);
    } else {
      console.log(`Mapping for id "${id}" does not exist in "${filePath}".`);
    }
  } catch (error) {
    console.error(`Error removing name mapping: ${error.message}`);
  }
}
