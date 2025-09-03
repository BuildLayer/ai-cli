import chalk from "chalk";
import { execSync } from "child_process";

export async function testProject(): Promise<void> {
  console.log(chalk.blue("Running tests for AI UI SDK project...\n"));

  try {
    // Run tests for all packages
    console.log(chalk.yellow("Running package tests..."));
    execSync("pnpm test", { stdio: "inherit" });

    console.log(chalk.green("Tests completed successfully!"));
  } catch (error) {
    console.error(chalk.red("Tests failed:"), error);
    throw error;
  }
}
