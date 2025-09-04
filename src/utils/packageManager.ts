import { execSync } from "child_process";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";

export interface PackageJson {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export function updatePackageJson(
  projectDir: string,
  options: { useTypeScript: boolean; useTailwind: boolean; preset?: string }
): void {
  const packageJsonPath = join(projectDir, "package.json");

  if (!existsSync(packageJsonPath)) {
    throw new Error("package.json not found");
  }

  const packageJson: PackageJson = JSON.parse(
    readFileSync(packageJsonPath, "utf-8")
  );

  // Add AI dependencies - jednostavno i direktno
  packageJson.dependencies["@buildlayer/ai-core"] = "^0.1.2";
  packageJson.dependencies["@buildlayer/ai-react"] = "^0.1.7";
  packageJson.dependencies["react-router-dom"] = "^6.8.0";

  // Override React version to be compatible with ai-react
  packageJson.dependencies.react = "^18.3.1";
  packageJson.dependencies["react-dom"] = "^18.3.1";

  // Override React types to be compatible with ai-react
  if (packageJson.devDependencies) {
    // Force remove existing React types first
    delete packageJson.devDependencies["@types/react"];
    delete packageJson.devDependencies["@types/react-dom"];

    // Add correct versions
    packageJson.devDependencies["@types/react"] = "^18.3.24";
    packageJson.devDependencies["@types/react-dom"] = "^18.3.7";

    // Force override TypeScript version
    delete packageJson.devDependencies["typescript"];
    packageJson.devDependencies["typescript"] = "^5.9.2";
  }

  // Add Tailwind if needed
  if (options.useTailwind) {
    packageJson.dependencies["@tailwindcss/postcss"] = "^4.1.12";
    packageJson.dependencies["autoprefixer"] = "^10.4.21";
    packageJson.dependencies["postcss"] = "^8.5.6";
    packageJson.dependencies["tailwindcss"] = "^4.0.0";
  }

  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

export function reinstallDependencies(projectDir: string): void {
  // Force reinstall with correct TypeScript version
  console.log("Reinstalling with correct TypeScript version...");
  execSync("pnpm remove typescript && pnpm add -D typescript@^5.9.2", {
    cwd: projectDir,
    stdio: "inherit",
  });

  // Force reinstall with correct React types
  console.log("Reinstalling with correct React types...");
  execSync(
    "pnpm remove @types/react @types/react-dom && pnpm add -D @types/react@^18.3.24 @types/react-dom@^18.3.7",
    {
      cwd: projectDir,
      stdio: "inherit",
    }
  );
}
