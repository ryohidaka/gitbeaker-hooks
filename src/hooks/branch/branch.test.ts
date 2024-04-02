import { useGitbeaker } from "@/provider";
import { useBranches } from ".";
import { Mock, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

vi.mock("@/provider");

describe("useBranches", () => {
  it("fetches branches using the provided options", async () => {
    // Mock the Gitbeaker API
    const mockApi = {
      Branches: {
        all: vi.fn(),
      },
    };
    (useGitbeaker as Mock).mockReturnValue(mockApi);

    // Mock the return value of the API call
    const mockBranches = [{ id: 1, name: "Test Branch" }];
    mockApi.Branches.all.mockResolvedValue(mockBranches);

    // Use the hook
    const { result } = renderHook(() => useBranches(1));

    // Wait for useSWR to return the data
    await waitFor(() => result.current.branches !== undefined);

    // Check that the API was called with the correct options
    expect(mockApi.Branches.all).toHaveBeenCalledWith(1, undefined);

    // Check that the hook returns the correct data
    expect(result.current.branches).toEqual(mockBranches);
  });
});
