import { useGitbeaker } from "@/provider";
import { useRepositoryTrees } from ".";
import { Mock, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

vi.mock("@/provider");

describe("useRepositoryTrees", () => {
  it("fetches repository trees using the provided options", async () => {
    // Mock the Gitbeaker API
    const mockApi = {
      Repositories: {
        allRepositoryTrees: vi.fn(),
      },
    };
    (useGitbeaker as Mock).mockReturnValue(mockApi);

    // Mock the return value of the API call
    const mockRepositories = [{ id: 1, name: "Test Repository" }];
    mockApi.Repositories.allRepositoryTrees.mockResolvedValue(mockRepositories);

    // Use the hook
    const { result } = renderHook(() => useRepositoryTrees(1));

    // Wait for useSWR to return the data
    await waitFor(() => result.current.repositories !== undefined);

    // Check that the API was called with the correct options
    expect(mockApi.Repositories.allRepositoryTrees).toHaveBeenCalledWith(
      1,
      undefined,
    );

    // Check that the hook returns the correct data
    expect(result.current.repositories).toEqual(mockRepositories);
  });
});
