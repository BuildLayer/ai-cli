#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { createProject } from "./commands/create.ts";
import { buildProject } from "./commands/build.ts";
import { testProject } from "./commands/test.ts";

const program = new Command();

program
  .name("ai-cli")
  .description("AI UI SDK development and scaffolding CLI")
  .version("0.1.0");

program
  .command("create")
  .description("Create a new AI chat project")
  .option("-t, --template <template>", "Project template to use", "basic")
  .option("-d, --directory <directory>", "Project directory name")
  .option("--typescript", "Use TypeScript", true)
  .option("--no-typescript", "Don't use TypeScript")
  .option("--tailwind", "Use Tailwind CSS", true)
  .option("--no-tailwind", "Don't use Tailwind CSS")
  .action(async (options) => {
    try {
      await createProject(options);
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
