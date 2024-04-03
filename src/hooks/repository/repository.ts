import { useGitbeaker } from "@/provider";
import { CustomAllRepositoryTreesOptions } from "@/types";
import useSWR from "swr";

/**
 * useRepositoryTrees is a custom hook that fetches, caches, and revalidates repository data.
 *
 * @param {string | number} projectId - The ID of the project for which repositories are to be fetched.
 * @param {CustomAllRepositoryTreesOptions} options - Optional parameters for fetching the repositories.
 * @returns {Object} An object containing the fetched repositories and other SWR values.
 * @throws {Error} If projectId is not provided.
 */
export const useRepositoryTrees = (
  projectId: string | number,
  options?: CustomAllRepositoryTreesOptions,
) => {
  // Initialize the Gitbeaker API
  const api = useGitbeaker();

  /**
   * fetcher is a function that fetches all repositories for the given project ID with the provided options.
   *
   * @returns {Promise<Array>} A promise that resolves to an array of repositories.
   */
  const fetcher = async () => {
    // Fetch all repositories with the provided options
    const repositories = await api.Repositories.allRepositoryTrees(
      projectId,
      options,
    );
    return repositories;
  };

  // Generate a unique key for SWR based on the project ID
  const key = projectId ? `repositories-${projectId}` : undefined;

  // Use SWR to fetch, cache, and revalidate the data
  const { data: repositories, ...rest } = useSWR(key, fetcher);

  // Return the repositories and other SWR values
  return { repositories, ...rest };
};
