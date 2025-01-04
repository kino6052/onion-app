import { octokit } from "./octokit";

export async function ensureFileExists(
  repoName: string,
  branchName: string,
  filePath: string,
  content: string,
  commitMessage: string
) {
  try {
    const {
      data: { login },
    } = await octokit.rest.users.getAuthenticated();

    try {
      await octokit.rest.repos.getContent({
        owner: login,
        repo: repoName,
        path: filePath,
        ref: branchName,
      });
      console.log(
        `File "${filePath}" already exists in branch "${branchName}".`
      );
    } catch (error) {
      if (error.status === 404) {
        await createNewFile(
          repoName,
          branchName,
          filePath,
          content,
          commitMessage
        );
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error(`Error ensuring file exists: ${error.message}`);
  }
}

export async function deleteFileByName(
  repoName: string,
  branchName: string,
  fileName: string,
  commitMessage: string
) {
  try {
    const {
      data: { login },
    } = await octokit.rest.users.getAuthenticated();

    const { data: ref } = await octokit.rest.git.getRef({
      owner: login,
      repo: repoName,
      ref: `heads/${branchName}`,
    });

    const { data: tree } = await octokit.rest.git.getTree({
      owner: login,
      repo: repoName,
      tree_sha: ref.object.sha,
      recursive: "true",
    });

    const file = tree.tree.find(
      (item) => item.type === "blob" && item.path?.endsWith(fileName)
    );

    if (!file) {
      console.log(`File "${fileName}" not found in branch "${branchName}".`);
      return;
    }

    await octokit.rest.repos.deleteFile({
      owner: login,
      repo: repoName,
      path: file.path,
      message: commitMessage,
      sha: file.sha,
      branch: branchName,
    });

    console.log(`File "${fileName}" deleted from branch "${branchName}".`);
  } catch (error) {
    console.error(`Error deleting file by name: ${error.message}`);
  }
}

export async function getFileContent(
  repoName: string,
  branchName: string,
  filePath: string
): Promise<string | undefined> {
  try {
    const {
      data: { login },
    } = await octokit.rest.users.getAuthenticated();

    const { data: fileData } = await octokit.rest.repos.getContent({
      owner: login,
      repo: repoName,
      path: filePath,
      ref: branchName,
    });

    return Buffer.from(fileData.content, "base64").toString();
  } catch (error) {
    if (error.status === 404) {
      return undefined;
    }
    throw error;
  }
}

export async function updateFileContent(
  repoName: string,
  branchName: string,
  filePath: string,
  content: string,
  commitMessage: string
) {
  try {
    const encodedContent = Buffer.from(content).toString("base64");

    const {
      data: { login },
    } = await octokit.rest.users.getAuthenticated();

    let fileSha: string | undefined = undefined;

    try {
      const { data: fileData } = await octokit.rest.repos.getContent({
        owner: login,
        repo: repoName,
        path: filePath,
        ref: branchName,
      });

      fileSha = Array.isArray(fileData) ? fileData[0].sha : fileData.sha;
    } catch (error) {
      if (error.status !== 404) {
        throw error;
      }
    }

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: login,
      repo: repoName,
      path: filePath,
      message: commitMessage,
      content: encodedContent,
      sha: fileSha,
      branch: branchName,
    });

    console.log(`File "${filePath}" updated in branch "${branchName}".`);
  } catch (error) {
    console.error(`Error updating file: ${error.message}`);
  }
}

export async function updateFile(
  repoName: string,
  branchName: string,
  filePath: string,
  newContent: string,
  commitMessage: string
) {
  try {
    const encodedContent = Buffer.from(newContent).toString("base64");

    const {
      data: { login },
    } = await octokit.rest.users.getAuthenticated();

    const { data: fileData } = await octokit.rest.repos.getContent({
      owner: login,
      repo: repoName,
      path: filePath,
      ref: branchName,
    });

    const fileSha = Array.isArray(fileData) ? fileData[0].sha : fileData.sha;

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: login,
      repo: repoName,
      path: filePath,
      message: commitMessage,
      content: encodedContent,
      sha: fileSha,
      branch: branchName,
    });

    console.log(`File "${filePath}" updated in branch "${branchName}".`);
  } catch (error) {
    console.error(`Error updating file: ${error.message}`);
  }
}

export async function createNewFile(
  repoName: string,
  branchName: string,
  filePath: string,
  content: string,
  commitMessage: string
) {
  try {
    const encodedContent = Buffer.from(content).toString("base64");

    const {
      data: { login },
    } = await octokit.rest.users.getAuthenticated();
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: login,
      repo: repoName,
      path: filePath,
      message: commitMessage,
      content: encodedContent,
      branch: branchName,
    });

    console.log(`File "${filePath}" created in branch "${branchName}".`);
  } catch (error) {
    console.error(`Error creating new file: ${error.message}`);
  }
}

export async function getFileContentById(
  repoName: string,
  branchName: string,
  id: string
) {
  try {
    const {
      data: { login },
    } = await octokit.rest.users.getAuthenticated();

    const { data } = await octokit.rest.repos.getContent({
      owner: login,
      repo: repoName,
      path: id,
      ref: branchName,
      mediaType: {
        format: "raw",
        previews: [],
      },
    });
    return data ?? "";
  } catch (error) {
    console.error(`Error getting file content: ${error.message}`);
  }
}

export async function getFilesStartingWith(
  repoName: string,
  branchName: string,
  prefix: string
) {
  try {
    const {
      data: { login },
    } = await octokit.rest.users.getAuthenticated();

    const { data: ref } = await octokit.rest.git.getRef({
      owner: login,
      repo: repoName,
      ref: `heads/${branchName}`,
    });

    const { data: tree } = await octokit.rest.git.getTree({
      owner: login,
      repo: repoName,
      tree_sha: ref.object.sha,
      recursive: "true",
    });

    const files = tree.tree
      .filter((item) => item.type === "blob" && item.path?.startsWith(prefix))
      .map((item) => item.path);

    console.log(
      `Files starting with "${prefix}" in branch "${branchName}":`,
      files
    );
    return files;
  } catch (error) {
    console.error(
      `Error getting files starting with "${prefix}": ${error.message}`
    );
  }
}
