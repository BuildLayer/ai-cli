import chalk from "chalk";
import inquirer from "inquirer";
import { execSync } from "child_process";
import { join } from "path";
import { basename } from "path";
import { reactTemplates } from "../templates/react";
import { createBasicTemplate } from "../templates/basic";
import { createMinimalTemplate } from "../templates/minimal";
import { createExpressTemplate } from "../templates/express";
import {
  updatePackageJson,
  reinstallDependencies,
} from "../utils/packageManager";
import { createFile, createDirectory } from "../utils/fileManager";

export interface CreateOptions {
  preset?: string;
  directory?: string;
  projectName?: string;
  useTypeScript?: boolean;
  useTailwind?: boolean;
  skipPrompts?: boolean;
  typescript?: boolean;
  tailwind?: boolean;
}

// Define available presets
const PRESETS = {
  minimal: {
    name: "Minimal (AI Core Only)",
    description: "Console-based AI chat with @buildlayer/ai-core only",
    command: "", // Custom template creation
    postInstall: async (projectDir: string, options: any) => {
      // Template creation is handled in createProject function
    },
  },
  basic: {
    name: "Basic React + Vite",
    description: "Self-contained React app with AI chat UI",
    command: "", // Custom template creation
    postInstall: async (projectDir: string, options: any) => {
      // Template creation is handled in createProject function
    },
  },
  react: {
    name: "React + Vite (Full Featured)",
    description: "Complete React app with routing and AI components",
    command:
      "npm create vite@latest {projectName} -- --template {template} --yes",
    postInstall: async (projectDir: string, options: any) => {
      updatePackageJson(projectDir, { ...options, preset: "react" });
      reinstallDependencies(projectDir);
      createFile(join(projectDir, "src", "App.tsx"), reactTemplates.app);
      createFile(
        join(projectDir, "src", "index.css"),
        reactTemplates.indexCss(options.useTailwind)
      );
      if (options.useTailwind) {
        createFile(
          join(projectDir, "postcss.config.mjs"),
          reactTemplates.postcssConfig
        );
      }
    },
  },
  express: {
    name: "Express.js API",
    description: "Backend API server with AI chat endpoints",
    command: "", // Custom template creation
    postInstall: async (projectDir: string, options: any) => {
      // Template creation is handled in createProject function
    },
  },
};

export async function createProject(options: CreateOptions): Promise<void> {
  console.log(chalk.blue("Creating new AI UI SDK project...\n"));

  let projectName: string;
  let preset: string;
  let useTypeScript: boolean;
  let useTailwind: boolean;

  if (options.skipPrompts) {
    // Use provided options directly for testing
    projectName =
      options.projectName ||
      (options.directory ? basename(options.directory) : "test-project");
    preset = options.preset || "react";
    useTypeScript = options.useTypeScript ?? options.typescript ?? true;
    useTailwind = options.useTailwind ?? options.tailwind ?? true;
  } else if (
    options.typescript !== undefined ||
    options.tailwind !== undefined ||
    options.preset
  ) {
    // Use CLI options if provided
    projectName =
      options.projectName ||
      (options.directory ? basename(options.directory) : "ai-chat-app");
    preset = options.preset || "react";
    useTypeScript = options.useTypeScript ?? options.typescript ?? true;
    useTailwind = options.useTailwind ?? options.tailwind ?? true;
  } else {
    // Get project details from user prompts
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "What is your project name?",
        default: options.directory || "my-ai-chat-app",
        validate: (input: string) => {
          if (input.trim().length === 0) {
            return "Project name cannot be empty";
          }
          return true;
        },
      },
      {
        type: "list",
        name: "preset",
        message: "Which preset would you like to use?",
        choices: Object.entries(PRESETS).map(([key, preset]) => ({
          name: preset.name,
          value: key,
        })),
        default: options.preset || "react",
      },
      {
        type: "confirm",
        name: "useTypeScript",
        message: "Would you like to use TypeScript?",
        default: true,
        when: (answers) =>
          !PRESETS[answers.preset as keyof typeof PRESETS]?.command.includes(
            "--template react-ts"
          ),
      },
      {
        type: "confirm",
        name: "useTailwind",
        message: "Would you like to use Tailwind CSS?",
        default: true,
        when: (answers) =>
          !PRESETS[answers.preset as keyof typeof PRESETS]?.command.includes(
            "--tailwind"
          ),
      },
    ]);

    projectName = answers.projectName;
    preset = answers.preset;
    useTypeScript = answers.useTypeScript ?? true;
    useTailwind = answers.useTailwind ?? true;
  }

  console.log(chalk.yellow(`\nCreating project: ${projectName}`));
  console.log(
    chalk.yellow(`Preset: ${PRESETS[preset as keyof typeof PRESETS]?.name}`)
  );
  console.log(chalk.yellow(`TypeScript: ${useTypeScript ? "Yes" : "No"}`));
  console.log(chalk.yellow(`Tailwind CSS: ${useTailwind ? "Yes" : "No"}`));

  // Get preset configuration
  const presetConfig = PRESETS[preset as keyof typeof PRESETS];
  if (!presetConfig) {
    throw new Error(`Unknown preset: ${preset}`);
  }

  // Create project directory
  const projectDir = options.directory
    ? options.directory.startsWith("/")
      ? options.directory
      : join(process.cwd(), options.directory)
    : join(process.cwd(), projectName);

  try {
    // Handle custom template presets
    if (preset === "minimal") {
      await createMinimalTemplate(projectName, {
        useTypeScript,
        useTailwind,
        directory: options.directory,
      });
    } else if (preset === "basic") {
      await createBasicTemplate(projectName, {
        useTypeScript,
        useTailwind,
        directory: options.directory,
      });
    } else if (preset === "express") {
      await createExpressTemplate(projectName, {
        useTypeScript,
        useTailwind,
        directory: options.directory,
      });
    } else {
      // Handle standard presets that use external CLI tools
      let command = presetConfig.command
        .replace("{projectName}", projectName)
        .replace("{projectDir}", projectDir)
        .replace("{typescript}", useTypeScript ? "-ts" : "")
        .replace("{template}", useTypeScript ? "react-ts" : "react");

      console.log(chalk.blue(`\nExecuting: ${command}`));

      // Run the command
      execSync(command, {
        stdio: "inherit",
        cwd: process.cwd(),
      });

      // Run post-install steps
      console.log(
        chalk.blue("\nAdding AI UI SDK dependencies and configuration...")
      );
      await presetConfig.postInstall(projectDir, {
        useTypeScript,
        useTailwind,
      });
    }

    // Install dependencies with pnpm for custom templates
    if (["minimal", "basic", "express"].includes(preset)) {
      console.log(chalk.blue("\nInstalling dependencies with pnpm..."));
      execSync("pnpm install", {
        stdio: "inherit",
        cwd: projectDir,
      });
    }

    console.log(chalk.green("\nProject created successfully!"));
    console.log(chalk.blue("\nNext steps:"));
    console.log(chalk.white(`  cd ${projectName}`));

    // Provide preset-specific instructions
    if (preset === "minimal") {
      console.log(
        chalk.white("  # Configure your AI provider in src/index.ts")
      );
      console.log(chalk.white("  pnpm dev"));
    } else if (preset === "express") {
      console.log(chalk.white("  # Configure environment variables in .env"));
      console.log(chalk.white("  pnpm dev"));
    } else {
      console.log(chalk.white("  pnpm dev"));
    }
  } catch (error) {
    console.error(chalk.red("Failed to create project:"), error);
    throw error;
  }
}
