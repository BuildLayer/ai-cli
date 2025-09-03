import chalk from "chalk";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

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

  console.log(chalk.yellow("Creating basic React template..."));

  // Create project directory
  const projectDir = join(directory || process.cwd(), projectName);
  mkdirSync(projectDir, { recursive: true });

  // Create package.json
  const packageJson = {
    name: projectName,
    version: "0.1.0",
    private: true,
    scripts: {
      dev: "vite",
      build: "tsc && vite build",
      preview: "vite preview",
    },
    dependencies: {
      "@buildlayer/ai-core": "latest",
      "@buildlayer/ai-react": "latest",
      react: "^18.0.0",
      "react-dom": "^18.0.0",
    },
    devDependencies: {
      "@types/react": "^18.0.0",
      "@types/react-dom": "^18.0.0",
      "@vitejs/plugin-react": "^4.0.0",
      typescript: "^5.4.0",
      vite: "^5.0.0",
      ...(useTailwind && {
        autoprefixer: "^10.0.0",
        postcss: "^8.0.0",
        tailwindcss: "^3.0.0",
      }),
    },
  };

  writeFileSync(
    join(projectDir, "package.json"),
    JSON.stringify(packageJson, null, 2)
  );

  // Create Vite config
  const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
});`;

  writeFileSync(join(projectDir, "vite.config.ts"), viteConfig);

  // Create TypeScript config
  if (useTypeScript) {
    const tsConfig = `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`;

    writeFileSync(join(projectDir, "tsconfig.json"), tsConfig);

    const tsConfigNode = `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}`;

    writeFileSync(join(projectDir, "tsconfig.node.json"), tsConfigNode);
  }

  // Create Tailwind config
  if (useTailwind) {
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;

    writeFileSync(join(projectDir, "tailwind.config.js"), tailwindConfig);

    const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

    writeFileSync(join(projectDir, "postcss.config.js"), postcssConfig);
  }

  // Create HTML entry point
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.${useTypeScript ? "tsx" : "jsx"}"></script>
  </body>
</html>`;

  writeFileSync(join(projectDir, "index.html"), indexHtml);

  // Create source directory
  const srcDir = join(projectDir, "src");
  mkdirSync(srcDir, { recursive: true });

  // Create main entry point
  const mainFile = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.${useTypeScript ? "tsx" : "jsx"}';
${useTailwind ? "import './index.css';" : ""}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);`;

  writeFileSync(
    join(srcDir, `main.${useTypeScript ? "tsx" : "jsx"}`),
    mainFile
  );

  // Create App component
  const appFile = `import React, { useState } from 'react';
import { ChatPanel } from '@buildlayer/ai-react';
import { ChatStore, OpenAIAdapter } from '@buildlayer/ai-core';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [chatStore, setChatStore] = useState(null);

  const handleConnect = () => {
    if (!apiKey.trim()) return;

    const adapter = new OpenAIAdapter({ apiKey: apiKey.trim() });
    const store = new ChatStore(adapter);
    setChatStore(store);
  };

  if (!chatStore) {
    return (
      <div className="${useTailwind ? "min-h-screen bg-gray-50 flex items-center justify-center" : ""}">
        <div className="${useTailwind ? "max-w-md w-full bg-white rounded-lg shadow-md p-6" : ""}">
          <h1 className="${useTailwind ? "text-2xl font-bold text-gray-900 mb-4" : ""}">
            AI Chat Assistant
          </h1>
          <p className="${useTailwind ? "text-gray-600 mb-4" : ""}">
            Enter your OpenAI API key to start chatting
          </p>
          <div className="${useTailwind ? "space-y-4" : ""}">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="${useTailwind ? "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" : ""}"
            />
            <button
              onClick={handleConnect}
              disabled={!apiKey.trim()}
              className="${useTailwind ? "w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" : ""}"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="${useTailwind ? "min-h-screen bg-gray-50" : ""}">
      <div className="${useTailwind ? "max-w-4xl mx-auto h-screen flex flex-col" : ""}">
        <header className="${useTailwind ? "bg-white border-b border-gray-200 px-6 py-4" : ""}">
          <div className="${useTailwind ? "flex items-center justify-between" : ""}">
            <h1 className="${useTailwind ? "text-xl font-semibold text-gray-900" : ""}">
              AI Chat Assistant
            </h1>
            <button
              onClick={() => setChatStore(null)}
              className="${useTailwind ? "px-3 py-1 text-sm text-gray-600 hover:text-gray-900" : ""}"
            >
              Disconnect
            </button>
          </div>
        </header>
        
        <main className="${useTailwind ? "flex-1 bg-white" : ""}">
          <ChatPanel chatController={chatStore} />
        </main>
      </div>
    </div>
  );
}

export default App;`;

  writeFileSync(join(srcDir, `App.${useTypeScript ? "tsx" : "jsx"}`), appFile);

  // Create CSS file
  if (useTailwind) {
    const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;`;

    writeFileSync(join(srcDir, "index.css"), indexCss);
  }

  console.log(chalk.green(`Basic template created in ${projectName}/`));
}
