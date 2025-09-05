import chalk from "chalk";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";

interface TemplateOptions {
  useTypeScript: boolean;
  useTailwind: boolean;
  directory?: string;
}

export async function createBasicTemplate(
  projectName: string,
  options: TemplateOptions
): Promise<void> {
  const { useTypeScript, useTailwind, directory } = options;

  // Create project directory
  const baseDir = directory
    ? directory.startsWith("/")
      ? dirname(directory)
      : process.cwd()
    : process.cwd();
  const projectDir = directory ? directory : join(baseDir, projectName);
  mkdirSync(projectDir, { recursive: true });

  // Create src directory
  const srcDir = join(projectDir, "src");
  mkdirSync(srcDir, { recursive: true });

  // Create package.json
  const packageJson = {
    name: projectName,
    private: true,
    version: "0.1.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: useTypeScript ? "tsc && vite build" : "vite build",
      preview: "vite preview",
    },
    dependencies: {
      "@buildlayer/ai-core": "^0.1.3",
      "@buildlayer/ai-react": "^0.1.11",
      react: "^18.3.1",
      "react-dom": "^18.3.1",
      "react-router-dom": "^6.30.1",
    },
    devDependencies: {
      "@types/react": "^18.3.24",
      "@types/react-dom": "^18.3.7",
      "@vitejs/plugin-react": "^4.7.0",
      "@tailwindcss/postcss": "^4.1.12",
      postcss: "^8.0.0",
      tailwindcss: "^4.0.0",
      typescript: "^5.9.2",
      vite: "^5.4.19",
    },
  };

  writeFileSync(
    join(projectDir, "package.json"),
    JSON.stringify(packageJson, null, 2)
  );

  // Create vite.config.ts
  const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
})`;

  writeFileSync(join(projectDir, "vite.config.ts"), viteConfig);

  // Create tsconfig.json if TypeScript is enabled
  if (useTypeScript) {
    const tsConfig = {
      compilerOptions: {
        target: "ES2020",
        useDefineForClassFields: true,
        lib: ["ES2020", "DOM", "DOM.Iterable"],
        module: "ESNext",
        skipLibCheck: true,
        moduleResolution: "bundler",
        allowImportingTsExtensions: true,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: "react-jsx",
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true,
      },
      include: ["src"],
      references: [{ path: "./tsconfig.node.json" }],
    };

    writeFileSync(
      join(projectDir, "tsconfig.json"),
      JSON.stringify(tsConfig, null, 2)
    );

    const tsConfigNode = {
      compilerOptions: {
        composite: true,
        skipLibCheck: true,
        module: "ESNext",
        moduleResolution: "bundler",
        allowSyntheticDefaultImports: true,
      },
      include: ["vite.config.ts"],
    };

    writeFileSync(
      join(projectDir, "tsconfig.node.json"),
      JSON.stringify(tsConfigNode, null, 2)
    );
  }

  // Create tailwind.config.js if Tailwind is enabled
  if (useTailwind) {
    const postcssConfig = `export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}`;

    writeFileSync(join(projectDir, "postcss.config.js"), postcssConfig);
  }

  // Create index.html
  const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.${
      useTypeScript ? "tsx" : "jsx"
    }"></script>
  </body>
</html>`;

  writeFileSync(join(projectDir, "index.html"), indexHtml);

  // Create main.tsx/jsx
  const mainFile = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.${useTypeScript ? "tsx" : "jsx"}'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`;

  writeFileSync(
    join(srcDir, `main.${useTypeScript ? "tsx" : "jsx"}`),
    mainFile
  );

  // Create App component using the actual App component from ai-react
  const appFile = `import { App } from "@buildlayer/ai-react";
import "./index.css";

export default App;`;

  writeFileSync(join(srcDir, `App.${useTypeScript ? "tsx" : "jsx"}`), appFile);

  // Create CSS file - use ai-react CSS for proper theming
  const indexCss = `@import "tailwindcss";
@import "@buildlayer/ai-react/dist/style.css";`;

  writeFileSync(join(srcDir, "index.css"), indexCss);

  // Create .env file for environment variables
  const envFile = `# OpenAI API Configuration
# Add your OpenAI API key here to auto-connect
VITE_OPENAI_API_KEY=your-openai-api-key

# Other AI providers (uncomment to use)
# VITE_ANTHROPIC_API_KEY=your-anthropic-api-key
# VITE_MISTRAL_API_KEY=your-mistral-api-key
# VITE_GROK_API_KEY=your-grok-api-key
`;

  writeFileSync(join(projectDir, ".env"), envFile);
  writeFileSync(join(projectDir, ".env.example"), envFile);

  // Create README
  const readme = `# ${projectName}

A basic React AI chat application using @buildlayer/ai-core and @buildlayer/ai-react.

## Setup

1. Install dependencies:
   \`\`\`bash
   pnpm install
   \`\`\`

2. Configure your AI provider (choose one method):

   **Method 1: Environment Variable (Recommended)**
   \`\`\`bash
   # Edit .env file
   VITE_OPENAI_API_KEY=your-openai-api-key
   \`\`\`

   **Method 2: Manual Entry**
   - Start the app and enter your API key in the input field

3. Run the application:
   \`\`\`bash
   pnpm dev
   \`\`\`

## Available Commands

- \`pnpm dev\` - Start development server
- \`pnpm build\` - Build for production${
    useTypeScript ? "" : " (no-op for JavaScript)"
  }
- \`pnpm preview\` - Preview built application

## Features

- 🤖 AI chat with multiple provider support
- 🔑 API key management (environment variable or manual entry)
- 🎨 Tailwind CSS styling${useTypeScript ? " (when enabled)" : ""}
- ⚡ Vite for fast development
- 🔄 Hot module replacement

## Supported AI Providers

- OpenAI (\`createOpenAIAdapter\`)
- Anthropic (\`createAnthropicAdapter\`)
- Mistral (\`createMistralAdapter\`)
- Grok (\`createGrokAdapter\`)
- Local LLM (\`createLocalLLMAdapter\`)

## Environment Variables

- \`VITE_OPENAI_API_KEY\` - OpenAI API key (auto-connects if set)
- \`VITE_ANTHROPIC_API_KEY\` - Anthropic API key
- \`VITE_MISTRAL_API_KEY\` - Mistral API key
- \`VITE_GROK_API_KEY\` - Grok API key

## License

MIT
`;

  writeFileSync(join(projectDir, "README.md"), readme);

  console.log(chalk.green(`Basic template created in ${projectName}/`));
}
