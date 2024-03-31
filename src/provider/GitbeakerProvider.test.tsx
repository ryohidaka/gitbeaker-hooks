import { render } from "@testing-library/react";

import { Gitlab } from "@gitbeaker/rest";
import { vi } from "vitest";
import { GitbeakerProvider, useGitbeaker } from ".";

// Mock the Gitlab module
vi.mock("@gitbeaker/rest", () => {
  return {
    Gitlab: vi.fn(),
  };
});

describe("GitbeakerContext", () => {
  it("provides the Gitbeaker API when options are provided", () => {
    const TestComponent = () => {
      const api = useGitbeaker();

      expect(api).toBeInstanceOf(Gitlab);

      return null;
    };

    render(
      <GitbeakerProvider options={{ token: "hogehogem" }}>
        <TestComponent />
      </GitbeakerProvider>,
    );
  });

  it("throws an error when options are not provided", () => {
    const TestComponent = () => {
      const api = useGitbeaker();

      expect(api).toBeInstanceOf(Gitlab);

      return null;
    };

    // Expect an error to be thrown when TestComponent is rendered
    expect(() =>
      render(
        // @ts-ignore
        <GitbeakerProvider options={undefined}>
          <TestComponent />
        </GitbeakerProvider>,
      ),
    ).toThrow("GitbeakerProvider requires the options prop.");
  });

  it("throws an error when useGitbeaker is used outside a GitbeakerProvider", () => {
    const TestComponent = () => {
      // Call useGitbeaker directly in the render method
      const api = useGitbeaker();
      console.log(api);
      return null;
    };

    // Expect an error to be thrown when TestComponent is rendered
    expect(() => render(<TestComponent />)).toThrow(
      "useGitbeaker must be used within a GitbeakerProvider.",
    );
  });
});
