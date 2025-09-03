import chalk from "chalk";
import inquirer from "inquirer";
import { createBasicTemplate } from "../templates/basic";
import { basename } from "path";

export interface CreateOptions {
  template?: string;
  directory?: string;
  projectName?: string;
  useTypeScript?: boolean;
  useTailwind?: boolean;
  skipPrompts?: boolean;
  typescript?: boolean;
  tailwind?: boolean;
}

export async function createProject(options: CreateOptions): Promise<void> {
  console.log(chalk.blue("Creating new AI UI SDK project...\n"));

  let projectName: string;
  let template: string;
  let useTypeScript: boolean;
  let useTailwind: boolean;

  if (options.skipPrompts) {
    // Use provided options directly for testing
    projectName = options.projectName || "test-project";
    template = options.template || "basic";
    useTypeScript = options.useTypeScript ?? true;
    useTailwind = options.useTailwind ?? true;
  } else if (
    options.typescript !== undefined ||
    options.tailwind !== undefined
  ) {
    // Use CLI options if provided
    projectName =
      options.projectName ||
      (options.directory ? basename(options.directory) : "ai-chat-app");
    template = options.template || "basic";
    useTypeScript = options.typescript ?? true;
    useTailwind = options.tailwind ?? true;
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
        name: "template",
        message: "Which template would you like to use?",
        choices: [
          { name: "Basic React App", value: "basic" },
          // { name: "Next.js App", value: "nextjs" }
          // { name: "Vue.js App", value: "vue" }
        ],
        default: options.template || "basic",
      },
      {
        type: "confirm",
        name: "useTypeScript",
        message: "Would you like to use TypeScript?",
        default: true,
      },
      {
        type: "confirm",
        name: "useTailwind",
        message: "Would you like to use Tailwind CSS?",
        default: true,
      },
    ]);

    projectName = answers.projectName;
    template = answers.template;
    useTypeScript = answers.useTypeScript;
    useTailwind = answers.useTailwind;
  }

  console.log(chalk.yellow(`\nCreating project: ${projectName}`));
  console.log(chalk.yellow(`Template: ${template}`));
  console.log(chalk.yellow(`TypeScript: ${useTypeScript ? "Yes" : "No"}`));
  console.log(chalk.yellow(`Tailwind CSS: ${useTailwind ? "Yes" : "No"}`));

  // Create project based on template
  switch (template) {
    case "basic":
      await createBasicTemplate(projectName, {
        useTypeScript,
        useTailwind,
        directory: options.directory,
      });
      break;
    case "nextjs":
      // TODO: Implement Next.js template
      console.log(chalk.yellow("Next.js template coming soon..."));
      break;
    case "vue":
      // TODO: Implement Vue template
      console.log(chalk.yellow("Vue template coming soon..."));
      break;
    default:
      throw new Error(`Unknown template: ${template}`);
  }

  console.log(chalk.green("\nProject created successfully!"));
  console.log(chalk.blue("\nNext steps:"));
  console.log(chalk.white(`  cd ${projectName}`));
  console.log(chalk.white("  npm install"));
  console.log(chalk.white("  npm run dev"));
}
