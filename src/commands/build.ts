import chalk from "chalk";
import { execSync } from "child_process";

export async function buildProject(): Promise<void> {
  console.log(chalk.blue("Building AI UI SDK project...\n"));

  try {
    // Build all packages
    console.log(chalk.yellow("Building packages..."));
    execSync("pnpm build", { stdio: "inherit" });

    console.log(chalk.green("Build completed successfully!"));
  } catch (error) {
    console.error(chalk.red("Build failed:"), error);
    throw error;
  }
}
