import { BaseResourceOptions } from "@gitbeaker/requester-utils";
import { Gitlab } from "@gitbeaker/rest";
import { ReactNode, createContext, useContext, useMemo } from "react";

// Define the properties for the GitbeakerProvider component
type Props = {
  children: ReactNode; // The child components
  options: BaseResourceOptions<false>; // The options for the Gitlab API
};

type GitlabType = InstanceType<typeof Gitlab> | null;

// Create a context for the Gitbeaker API
const GitbeakerContext = createContext<GitlabType>(null);

/**
 * GitbeakerProvider is a React component that provides the Gitbeaker API to its children.
 * @param {ReactNode} children - The child components.
 * @param {BaseResourceOptions<false>} options - The options for the Gitlab API.
 */
const GitbeakerProvider = ({ children, options }: Props) => {
  // Create a new API instance with the provided options
  const contextValue = useMemo(() => {
    if (!options) {
      throw new Error("GitbeakerProvider requires the options prop.");
    }

    const api = new Gitlab(options);

    return api;
  }, [options]);

  // Provide the API to the child components
  return (
    <GitbeakerContext.Provider value={contextValue}>
      {children}
    </GitbeakerContext.Provider>
  );
};

/**
 * useGitbeaker is a custom hook that provides the Gitbeaker API.
 * It must be used within a GitbeakerProvider.
 * @throws {Error} If useGitbeaker is not used within a GitbeakerProvider.
 * @returns {Gitlab} The Gitbeaker API.
 */
const useGitbeaker = () => {
  const context = useContext(GitbeakerContext);

  if (!context) {
    throw new Error("useGitbeaker must be used within a GitbeakerProvider.");
  }
  return context;
};

// Export the GitbeakerProvider and useGitbeaker
export { GitbeakerProvider, useGitbeaker };
