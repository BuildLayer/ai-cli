#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { createProject } from "./commands/create";
import { buildProject } from "./commands/build";
import { testProject } from "./commands/test";

const program = new Command();

program
  .name("ai-cli")
  .description("AI UI SDK development and scaffolding CLI")
  .version("0.1.2");

program
  .command("create")
  .description("Create a new AI chat project")
  .argument(
    "[preset]",
    "Project preset (minimal, basic, react, express)",
    "react"
  )
  .argument("[directory]", "Project directory name")
  .option("--no-typescript", "Don't use TypeScript (default: true)")
  .option("--no-tailwind", "Don't use Tailwind CSS (default: true)")
  .action(async (preset, directory, options) => {
    try {
      const createOptions = {
        preset,
        directory,
        projectName: directory,
        typescript: options.typescript,
        tailwind: options.tailwind,
        useTypeScript: options.typescript,
        useTailwind: options.tailwind,
        skipPrompts: true,
      };

      await createProject(createOptions);
      console.log(chalk.green("Project created successfully!"));
    } catch (error) {
      console.error(chalk.red("Failed to create project:"), error);
      process.exit(1);
    }
  });

program
  .command("build")
  .description("Build all packages")
  .action(async () => {
    try {
      await buildProject();
      console.log(chalk.green("Build completed successfully!"));
    } catch (error) {
      console.error(chalk.red("Build failed:"), error);
      process.exit(1);
    }
  });

program
  .command("test")
  .description("Run tests for all packages")
  .action(async () => {
    try {
      await testProject();
      console.log(chalk.green("Tests completed successfully!"));
    } catch (error) {
      console.error(chalk.red("Tests failed:"), error);
      process.exit(1);
    }
  });

program.parse();
