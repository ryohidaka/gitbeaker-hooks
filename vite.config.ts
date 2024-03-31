import { resolve } from "path";
import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "index",
      formats: ["es"],
      fileName: "index",
    },
  },
  plugins: [
    dts({ exclude: ["src/example/", "*.test.ts", "*.test.tsx"] }),
    react(),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    setupFiles: ["./src/setupTests.ts"],
    coverage: {
      exclude: ["**/**/index.ts", ".eslintrc.cjs", "src/example"],
    },
    environment: "happy-dom",
  },
});
