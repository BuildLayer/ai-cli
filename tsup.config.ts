import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/cli.ts"],
  format: ["esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ["commander", "chalk", "inquirer"],
  outDir: "dist",
  onSuccess: "chmod +x dist/cli.js",
});
