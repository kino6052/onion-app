import { octokit } from "./octokit";

export async function renameBranch(
  repoName: string,
  oldBranchName: string,
  newBranchName: string
) {
  try {
    const {
      data: { login },
    } = await octokit.rest.users.getAuthenticated();

    const { data: ref } = await octokit.rest.git.getRef({
      owner: login,
      repo: repoName,
      ref: `heads/${oldBranchName}`,
    });

    await octokit.rest.git.createRef({
      owner: login,
      repo: repoName,
      ref: `refs/heads/${newBranchName}`,
      sha: ref.object.sha,
    });

    await octokit.rest.git.deleteRef({
      owner: login,
      repo: repoName,
      ref: `heads/${oldBranchName}`,
    });

    console.log(`Branch "${oldBranchName}" renamed to "${newBranchName}".`);
  } catch (error) {
    console.error(`Error renaming branch: ${error.message}`);
  }
}

export async function createBranch(
  repoName: string,
  branchName: string,
  sha: string
) {
  try {
    const {
      data: { login },
    } = await octokit.rest.users.getAuthenticated();

    await octokit.rest.git.createRef({
      owner: login,
      repo: repoName,
      ref: `refs/heads/${branchName}`,
      sha: sha,
    });
    console.log(`Branch "${branchName}" created.`);
  } catch (error) {
    console.error(`Error creating branch: ${error.message}`);
  }
}

export async function getLatestCommitSha(repoName: string) {
  try {
    const {
      data: { login },
    } = await octokit.rest.users.getAuthenticated();

    const {
      data: {
        object: { sha },
      },
    } = await octokit.rest.git.getRef({
      owner: login,
      repo: repoName,
      ref: "heads/main",
    });
    return sha;
  } catch (error) {
    console.error(`Error getting latest commit SHA: ${error.message}`);
  }
}

export async function createNewBranch(repoName: string, branchName: string) {
  const sha = await getLatestCommitSha(repoName);
  if (sha) {
    await createBranch(repoName, branchName, sha);
  }
}

export async function createInitialCommit(repoName: string) {
  try {
    const {
      data: { login },
    } = await octokit.rest.users.getAuthenticated();

    // Create a new file
    const content = Buffer.from("Initial commit").toString("base64");

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: login,
      repo: repoName,
      path: "README.md",
      message: "Initial commit",
      content: content,
    });

    console.log("Initial commit created.");
  } catch (error) {
    console.error(`Error creating initial commit: ${error.message}`);
  }
}

export async function checkoutBranchAndListFiles(
  repoName: string,
  branchName: string
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
      .filter((item) => item.type === "blob")
      .map((item) => item.path);
    console.log(`Files in branch "${branchName}":`, files);
  } catch (error) {
    console.error(
      `Error checking out branch and listing files: ${error.message}`
    );
  }
}
