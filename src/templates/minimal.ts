import chalk from "chalk";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";

interface TemplateOptions {
  useTypeScript: boolean;
  useTailwind: boolean;
  directory?: string;
}

export async function createMinimalTemplate(
  projectName: string,
  options: TemplateOptions
): Promise<void> {
  const { useTypeScript, directory } = options;

  console.log(chalk.yellow("Creating minimal AI core template..."));

  // Create project directory
  const baseDir = directory
    ? directory.startsWith("/")
      ? dirname(directory)
      : process.cwd()
    : process.cwd();
  const projectDir = directory ? directory : join(baseDir, projectName);
  mkdirSync(projectDir, { recursive: true });

  // Create package.json
  const packageJson = {
    name: projectName,
    version: "0.1.0",
    private: true,
    type: "module",
    scripts: {
      start: "node dist/index.js",
      build: useTypeScript ? "tsc" : "echo 'No build needed'",
      dev: useTypeScript ? "tsx src/index.ts" : "node src/index.js",
    },
    dependencies: {
      "@buildlayer/ai-core": "latest",
    },
    devDependencies: {
      ...(useTypeScript && {
        "@types/node": "^20.0.0",
        typescript: "^5.4.0",
        tsx: "^4.0.0",
      }),
    },
  };

  writeFileSync(
    join(projectDir, "package.json"),
    JSON.stringify(packageJson, null, 2)
  );

  // Create TypeScript config if needed
  if (useTypeScript) {
    const tsConfig = {
      compilerOptions: {
        target: "ES2020",
        module: "ESNext",
        moduleResolution: "node",
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        outDir: "./dist",
        rootDir: "./src",
      },
      include: ["src/**/*"],
      exclude: ["node_modules", "dist"],
    };

    writeFileSync(
      join(projectDir, "tsconfig.json"),
      JSON.stringify(tsConfig, null, 2)
    );
  }

  // Create source directory
  const srcDir = join(projectDir, "src");
  mkdirSync(srcDir, { recursive: true });

  // Create main entry point
  const fileExtension = useTypeScript ? "ts" : "js";
  const mainFile = `import { ChatStore } from "@buildlayer/ai-core";
import readline from "readline";

// Console-based AI chat interface
class ConsoleChat {
  ${useTypeScript ? "private chatStore: ChatStore;" : "chatStore;"}
  ${useTypeScript ? "private rl: readline.Interface;" : "rl;"}

  constructor() {
    // Initialize with a placeholder adapter - user needs to configure
    console.log("Welcome to AI Chat Console!");
    console.log("Please configure your AI provider adapter in src/index.${fileExtension}");
    
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Uncomment and configure your preferred adapter:
    // const adapter = createOpenAIAdapter("your-api-key");
    // const adapter = createAnthropicAdapter("your-api-key");
    // const adapter = createMistralAdapter("your-api-key");
    // this.chatStore = new ChatStore(adapter);
    
    this.startChat();
  }

  ${useTypeScript ? "private async" : "async"} startChat() {
    console.log("\\nType 'exit' to quit, 'clear' to clear history\\n");
    
    this.rl.setPrompt("You: ");
    this.rl.prompt();

    this.rl.on("line", async (input) => {
      const message = input.trim();
      
      if (message === "exit") {
        this.rl.close();
        return;
      }
      
      if (message === "clear") {
        if (this.chatStore) {
          this.chatStore.clearHistory();
          console.log("Chat history cleared.\\n");
        }
        this.rl.prompt();
        return;
      }

      if (!this.chatStore) {
        console.log("AI: Please configure an adapter first!");
        this.rl.prompt();
        return;
      }

      if (message) {
        try {
          console.log("AI: Thinking...");
          await this.chatStore.send(message);
          
          // Get the latest response
          const messages = this.chatStore.messages;
          const lastMessage = messages[messages.length - 1];
          
          if (lastMessage && lastMessage.role === "assistant") {
            console.log(\`AI: \${lastMessage.content[0]?.text || "No response"}\`);
          }
        } catch (error) {
          console.error("Error:", ${useTypeScript ? "error" : "error.message"});
        }
      }
      
      this.rl.prompt();
    });

    this.rl.on("close", () => {
      console.log("\\nGoodbye!");
      process.exit(0);
    });
  }
}

// Start the console chat
new ConsoleChat();
`;

  writeFileSync(join(srcDir, `index.${fileExtension}`), mainFile);

  // Create README
  const readme = `# ${projectName}

A minimal AI chat application using @buildlayer/ai-core.

## Setup

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Configure your AI provider in \`src/index.${fileExtension}\`:
   \`\`\`${useTypeScript ? "typescript" : "javascript"}
   import { createOpenAIAdapter } from "@buildlayer/ai-core";
   
   const adapter = createOpenAIAdapter("your-api-key");
   this.chatStore = new ChatStore(adapter);
   \`\`\`

3. Run the application:
   \`\`\`bash
   npm run dev
   \`\`\`

## Available Commands

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production${
    useTypeScript ? "" : " (no-op for JavaScript)"
  }
- \`npm start\` - Run built application

## Console Commands

- Type any message to chat with AI
- \`clear\` - Clear chat history
- \`exit\` - Quit the application

## Supported AI Providers

- OpenAI (\`createOpenAIAdapter\`)
- Anthropic (\`createAnthropicAdapter\`)
- Mistral (\`createMistralAdapter\`)
- Grok (\`createGrokAdapter\`)
- Local LLM (\`createLocalLLMAdapter\`)
`;

  writeFileSync(join(projectDir, "README.md"), readme);

  console.log(chalk.green(`Minimal template created in ${projectName}/`));
}
