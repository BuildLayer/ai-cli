import chalk from "chalk";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";

interface TemplateOptions {
  useTypeScript: boolean;
  useTailwind: boolean;
  directory?: string;
}

export async function createExpressTemplate(
  projectName: string,
  options: TemplateOptions
): Promise<void> {
  const { useTypeScript, directory } = options;

  console.log(chalk.yellow("Creating Express.js API template..."));

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
      start: "node dist/server.js",
      build: useTypeScript ? "tsc" : "echo 'No build needed'",
      dev: useTypeScript
        ? "tsx --watch src/server.ts"
        : "nodemon src/server.js",
    },
    dependencies: {
      "@buildlayer/ai-core": "latest",
      express: "^4.18.0",
      cors: "^2.8.5",
      helmet: "^7.0.0",
      dotenv: "^16.0.0",
      ws: "^8.14.0",
    },
    devDependencies: {
      ...(useTypeScript && {
        "@types/express": "^4.17.0",
        "@types/cors": "^2.8.0",
        "@types/node": "^20.0.0",
        "@types/ws": "^8.5.0",
        typescript: "^5.4.0",
        tsx: "^4.0.0",
      }),
      nodemon: "^3.0.0",
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
        types: ["node"],
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

  // Create main server file
  const fileExtension = useTypeScript ? "ts" : "js";
  const serverFile = `${
    useTypeScript
      ? 'import express, { Request, Response } from "express";'
      : 'const express = require("express");'
  }
${useTypeScript ? 'import cors from "cors";' : 'const cors = require("cors");'}
${
  useTypeScript
    ? 'import helmet from "helmet";'
    : 'const helmet = require("helmet");'
}
${
  useTypeScript
    ? 'import dotenv from "dotenv";'
    : 'const dotenv = require("dotenv");'
}
${
  useTypeScript
    ? 'import { WebSocketServer } from "ws";'
    : 'const { WebSocketServer } = require("ws");'
}
${
  useTypeScript
    ? 'import { createServer } from "http";'
    : 'const { createServer } = require("http");'
}
${
  useTypeScript
    ? 'import { ChatStore, createOpenAIAdapter } from "@buildlayer/ai-core";'
    : 'const { ChatStore, createOpenAIAdapter } = require("@buildlayer/ai-core");'
}

dotenv.config();

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req${useTypeScript ? ": Request" : ""}, res${
    useTypeScript ? ": Response" : ""
  }) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Chat store instances (in production, use proper session management)
const chatStores = new Map${useTypeScript ? "<string, ChatStore>" : ""}();

// Initialize chat store for a session
function initializeChatStore(sessionId${useTypeScript ? ": string" : ""}) {
  const apiKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    throw new Error("No API key configured. Set OPENAI_API_KEY or ANTHROPIC_API_KEY environment variable.");
  }

  // Configure your preferred adapter
  const adapter = createOpenAIAdapter(apiKey);
  // const adapter = createAnthropicAdapter(apiKey);
  // const adapter = createMistralAdapter(apiKey);
  
  const chatStore = new ChatStore(adapter, sessionId);
  chatStores.set(sessionId, chatStore);
  
  return chatStore;
}

// REST API endpoints
app.post("/api/chat/send", async (req${useTypeScript ? ": Request" : ""}, res${
    useTypeScript ? ": Response" : ""
  }) => {
  try {
    const { message, sessionId = "default", model } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    let chatStore = chatStores.get(sessionId);
    if (!chatStore) {
      chatStore = initializeChatStore(sessionId);
    }

    await chatStore.send(message, { model });

    const messages = chatStore.messages;
    const lastMessage = messages[messages.length - 1];

    res.json({
      success: true,
      message: lastMessage,
      sessionId,
      totalMessages: messages.length,
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({
      error: "Failed to process message",
      details: error${useTypeScript ? "" : ".message"},
    });
  }
});

app.get("/api/chat/history/:sessionId?", (req${
    useTypeScript ? ": Request" : ""
  }, res${useTypeScript ? ": Response" : ""}) => {
  const sessionId = req.params.sessionId || "default";
  const chatStore = chatStores.get(sessionId);

  if (!chatStore) {
    return res.json({ messages: [], sessionId });
  }

  res.json({
    messages: chatStore.messages,
    sessionId,
    totalMessages: chatStore.messages.length,
  });
});

app.delete("/api/chat/history/:sessionId?", (req${
    useTypeScript ? ": Request" : ""
  }, res${useTypeScript ? ": Response" : ""}) => {
  const sessionId = req.params.sessionId || "default";
  const chatStore = chatStores.get(sessionId);

  if (chatStore) {
    chatStore.clearHistory();
  }

  res.json({ success: true, sessionId });
});

// WebSocket support for real-time chat
wss.on("connection", (ws, req) => {
  console.log("WebSocket connection established");
  
  const sessionId = new URL(req.url!, \`http://\${req.headers.host}\`).searchParams.get("sessionId") || "default";
  
  let chatStore = chatStores.get(sessionId);
  if (!chatStore) {
    try {
      chatStore = initializeChatStore(sessionId);
    } catch (error) {
      ws.send(JSON.stringify({
        type: "error",
        error: "Failed to initialize chat store",
        details: error${useTypeScript ? "" : ".message"},
      }));
      ws.close();
      return;
    }
  }

  // Subscribe to chat store updates
  const unsubscribe = chatStore.subscribe((state) => {
    ws.send(JSON.stringify({
      type: "state",
      state,
      sessionId,
    }));
  });

  ws.on("message", async (data) => {
    try {
      const { type, message, model } = JSON.parse(data.toString());

      if (type === "send" && message) {
        await chatStore!.send(message, { model });
      } else if (type === "clear") {
        chatStore!.clearHistory();
      }
    } catch (error) {
      ws.send(JSON.stringify({
        type: "error",
        error: "Failed to process message",
        details: error${useTypeScript ? "" : ".message"},
      }));
    }
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
    unsubscribe();
  });

  // Send initial state
  ws.send(JSON.stringify({
    type: "connected",
    sessionId,
    messages: chatStore.messages,
  }));
});

// Error handling middleware
app.use((err${useTypeScript ? ": any" : ""}, req${
    useTypeScript ? ": Request" : ""
  }, res${useTypeScript ? ": Response" : ""}, next${
    useTypeScript ? ": any" : ""
  }) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "Internal server error",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(\`🚀 Server running on http://localhost:\${PORT}\`);
  console.log(\`📡 WebSocket server running on ws://localhost:\${PORT}\`);
  console.log(\`📚 API Documentation:\`);
  console.log(\`   POST /api/chat/send - Send a message\`);
  console.log(\`   GET  /api/chat/history/:sessionId - Get chat history\`);
  console.log(\`   DELETE /api/chat/history/:sessionId - Clear chat history\`);
  console.log(\`   GET  /health - Health check\`);
});
`;

  writeFileSync(join(srcDir, `server.${fileExtension}`), serverFile);

  // Create .env file
  const envFile = `# AI Provider Configuration
# Uncomment and configure your preferred provider:

# OpenAI
# OPENAI_API_KEY=your-openai-api-key

# Anthropic
# ANTHROPIC_API_KEY=your-anthropic-api-key

# Mistral
# MISTRAL_API_KEY=your-mistral-api-key

# Grok
# GROK_API_KEY=your-grok-api-key

# Server Configuration
PORT=3001
NODE_ENV=development
`;

  writeFileSync(join(projectDir, ".env"), envFile);

  // Create .env.example
  writeFileSync(join(projectDir, ".env.example"), envFile);

  // Create README
  const readme = `# ${projectName}

Express.js API server for AI chat functionality using @buildlayer/ai-core.

## Features

- REST API endpoints for chat operations
- WebSocket support for real-time communication
- Multiple AI provider support
- Session management
- CORS and security middleware
- Health check endpoint

## Setup

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Configure environment variables:
   \`\`\`bash
   cp .env.example .env
   # Edit .env and add your API keys
   \`\`\`

3. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## API Endpoints

### REST API

- \`POST /api/chat/send\` - Send a message
  \`\`\`json
  {
    "message": "Hello, AI!",
    "sessionId": "optional-session-id",
    "model": "optional-model-name"
  }
  \`\`\`

- \`GET /api/chat/history/:sessionId?\` - Get chat history
- \`DELETE /api/chat/history/:sessionId?\` - Clear chat history
- \`GET /health\` - Health check

### WebSocket

Connect to \`ws://localhost:3001?sessionId=your-session-id\`

Send messages:
\`\`\`json
{
  "type": "send",
  "message": "Hello, AI!",
  "model": "optional-model-name"
}
\`\`\`

Clear history:
\`\`\`json
{
  "type": "clear"
}
\`\`\`

## Environment Variables

- \`OPENAI_API_KEY\` - OpenAI API key
- \`ANTHROPIC_API_KEY\` - Anthropic API key
- \`MISTRAL_API_KEY\` - Mistral API key
- \`GROK_API_KEY\` - Grok API key
- \`PORT\` - Server port (default: 3001)
- \`NODE_ENV\` - Environment (development/production)

## Scripts

- \`npm run dev\` - Start development server with auto-reload
- \`npm run build\` - Build for production${
    useTypeScript ? "" : " (no-op for JavaScript)"
  }
- \`npm start\` - Start production server

## Example Client Usage

### REST API
\`\`\`javascript
// Send a message
const response = await fetch('http://localhost:3001/api/chat/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Hello, AI!',
    sessionId: 'user123'
  })
});
const data = await response.json();
\`\`\`

### WebSocket
\`\`\`javascript
const ws = new WebSocket('ws://localhost:3001?sessionId=user123');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};

ws.send(JSON.stringify({
  type: 'send',
  message: 'Hello, AI!'
}));
\`\`\`
`;

  writeFileSync(join(projectDir, "README.md"), readme);

  console.log(chalk.green(`Express template created in ${projectName}/`));
}
