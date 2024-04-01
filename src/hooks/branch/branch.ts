import { useGitbeaker } from "@/provider";
import { CustomAllBranchesOptions } from "@/types";
import useSWR from "swr";

/**
 * useBranches is a custom hook that fetches all branches for a given project ID.
 * It uses the Gitbeaker API and SWR for data fetching, caching, and revalidation.
 *
 * @param {string | number} projectId - The ID of the project.
 * @param {CustomAllBranchesOptions} options - Optional parameters for fetching branches.
 * @returns {Object} An object containing the branches and other SWR values.
 */
export const useBranches = (
  projectId: string | number,
  options?: CustomAllBranchesOptions,
) => {
  // Initialize the Gitbeaker API
  const api = useGitbeaker();

  /**
   * fetcher is an asynchronous function that fetches all branches for the given project ID with the provided options.
   *
   * @returns {Promise<Array>} A promise that resolves to an array of branches.
   */
  const fetcher = async () => {
    const branches = await api.Branches.all(projectId, options);
    return branches;
  };

  // Use SWR to fetch, cache, and revalidate the data
  const { data: branches, ...rest } = useSWR("branches", fetcher);

  // Return the branches and other SWR values
  return { branches, ...rest };
};
