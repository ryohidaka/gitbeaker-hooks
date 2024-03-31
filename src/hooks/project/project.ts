import { useGitbeaker } from "@/provider";
import { CustomAllProjectsOptions } from "@/types";
import useSWR from "swr";

/**
 * useProjects is a custom hook that fetches and returns project data.
 * It uses the Gitbeaker API to fetch the data and SWR for caching, revalidation, and other features.
 *
 * @param {CustomAllProjectsOptions} options - The options to customize the projects fetching.
 * @returns {Object} An object containing the fetched projects and other SWR values.
 */
export const useProjects = (options?: CustomAllProjectsOptions) => {
  // Initialize the Gitbeaker API
  const api = useGitbeaker();

  // Define the fetcher function
  const fetcher = async () => {
    // Fetch all projects with the provided options
    const projects = await api.Projects.all(options);
    return projects;
  };

  // Use SWR to fetch, cache, and revalidate the data
  const { data: projects, ...rest } = useSWR("projects", fetcher);

  // Return the projects and other SWR values
  return { projects, ...rest };
};
