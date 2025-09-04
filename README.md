# @buildlayer/ai-cli

> A powerful command-line tool for creating AI-powered chat applications with multiple frameworks and deployment options

[![npm version](https://img.shields.io/npm/v/@buildlayer/ai-cli.svg)](https://www.npmjs.com/package/@buildlayer/ai-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Quick Start

Create a new AI chat application in seconds:

```bash
npx @buildlayer/ai-cli create my-ai-chat-app
```

## Installation

### Global Installation

```bash
# npm
npm install -g @buildlayer/ai-cli

# pnpm
pnpm add -g @buildlayer/ai-cli

# yarn
yarn global add @buildlayer/ai-cli
```

### Local Installation

```bash
# npm
npm install --save-dev @buildlayer/ai-cli

# pnpm
pnpm add -D @buildlayer/ai-cli

# yarn
yarn add -D @buildlayer/ai-cli
```

### Using npx/pnpx/yarn dlx (Recommended)

```bash
# npm
npx @buildlayer/ai-cli create my-ai-chat-app

# pnpm
pnpx @buildlayer/ai-cli create my-ai-chat-app

# yarn
yarn dlx @buildlayer/ai-cli create my-ai-chat-app
```

## Commands

### `create` - Create New Project

Creates a new AI chat application with your chosen preset and configuration.

```bash
ai-cli create [preset] [directory] [options]
```

**Presets:**

- `minimal` - Console-based AI chat with @buildlayer/ai-core only
- `basic` - Self-contained React app with AI chat UI
- `react` - Complete React app with routing and AI components (default)
- `express` - Backend API server with AI chat endpoints

**Options:**

- `--no-typescript` - Use JavaScript instead of TypeScript (default: TypeScript enabled)
- `--no-tailwind` - Skip Tailwind CSS (default: Tailwind enabled)
- `--deploy <platform>` - Deploy target (vercel, netlify, railway) [default: vercel]

**Examples:**

```bash
# Create React app with TypeScript and Tailwind (default)
ai-cli create my-chat-app

# Create minimal console app
ai-cli create minimal my-console-chat

# Create JavaScript app without Tailwind
ai-cli create basic my-js-app --no-typescript --no-tailwind

# Create Express API server
ai-cli create express my-api-server

# Create in specific directory
ai-cli create react my-chat-app --directory /path/to/projects
```

### `build` - Build Project

Builds the AI UI SDK project and all packages.

```bash
ai-cli build
```

### `test` - Run Tests

Runs tests for the AI UI SDK project.

```bash
ai-cli test
```

## Presets Overview

### 🖥️ Minimal

Console-based AI chat application with @buildlayer/ai-core only.

**Best for:** Custom integrations, CLI tools, learning AI core functionality

```bash
ai-cli create minimal my-console-chat
```

**Features:**

- Console-based chat interface
- @buildlayer/ai-core integration
- Multiple AI provider support
- TypeScript/JavaScript options
- No UI dependencies

### ⚡ Basic

Self-contained React application with AI chat UI.

**Best for:** Quick prototypes, simple chat apps, learning React + AI

```bash
ai-cli create basic my-chat-app
```

**Features:**

- React 18 + Vite
- @buildlayer/ai-core + @buildlayer/ai-react
- Tailwind CSS styling
- TypeScript/JavaScript options
- Self-contained (no external CLI tools)

### 🚀 React (Full Featured)

Complete React application with routing and advanced AI components.

**Best for:** Production React SPAs, complex chat applications

```bash
ai-cli create react my-chat-app
```

**Features:**

- React 18 + Vite + React Router
- Full @buildlayer/ai-react component library
- Navigation and session management
- Theme switching
- Keyboard shortcuts
- TypeScript/JavaScript options

### 🔧 Express

Backend API server with AI chat endpoints and WebSocket support.

**Best for:** API development, microservices, backend-only solutions

```bash
ai-cli create express my-api-server
```

**Features:**

- Express.js + TypeScript/JavaScript
- REST API endpoints
- WebSocket support
- CORS and security middleware
- Multiple AI provider support
- Session management

## What Gets Created

### Project Structure (React Example)

```text
my-ai-chat-app/
├── src/
│   ├── App.tsx          # Main AI chat application
│   ├── main.tsx         # React entry point
│   └── index.css        # Tailwind CSS styles
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── index.html           # HTML entry point
```

## Included Dependencies

### Core Dependencies

- `@buildlayer/ai-core` - AI chat engine and store
- `@buildlayer/ai-react` - React UI components (React presets)

### Framework Dependencies

**React:**

- `react` - React 18
- `react-dom` - React DOM
- `react-router-dom` - Client-side routing (React preset)

**Express:**

- `express` - Web framework
- `cors` - CORS middleware
- `helmet` - Security middleware
- `ws` - WebSocket support

### Development Dependencies

- `typescript` - TypeScript support (when enabled)
- `tailwindcss` - CSS framework (when enabled)
- `vite` - Build tool (React presets)
- `@vitejs/plugin-react` - React plugin for Vite

## Getting Started

After creating your project:

```bash
cd my-ai-chat-app

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Preset-Specific Setup

**Minimal:**

```bash
# Configure your AI provider in src/index.ts
# Edit the adapter configuration
pnpm dev
```

**Express:**

```bash
# Configure environment variables in .env
# Add your API keys
pnpm dev
```

## AI Provider Configuration

All presets support multiple AI providers through @buildlayer/ai-core:

### OpenAI

```typescript
import { createOpenAIAdapter } from '@buildlayer/ai-core';
const adapter = createOpenAIAdapter('your-openai-api-key');
```

### Anthropic

```typescript
import { createAnthropicAdapter } from '@buildlayer/ai-core';
const adapter = createAnthropicAdapter('your-anthropic-api-key');
```

### Mistral

```typescript
import { createMistralAdapter } from '@buildlayer/ai-core';
const adapter = createMistralAdapter('your-mistral-api-key');
```

### Grok

```typescript
import { createGrokAdapter } from '@buildlayer/ai-core';
const adapter = createGrokAdapter('your-grok-api-key');
```

### Local LLM (Ollama)

```typescript
import { createLocalLLMAdapter } from '@buildlayer/ai-core';
const adapter = createLocalLLMAdapter({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'ollama'
});
```

## Configuration

### TypeScript Configuration

When TypeScript is enabled, the generated `tsconfig.json` includes:

- Strict type checking
- Modern ES modules
- React JSX support
- Path mapping for clean imports

### Tailwind CSS Configuration

When Tailwind is enabled, the generated `tailwind.config.js` includes:

- Content paths for all source files
- Extensible theme configuration
- PostCSS integration

### Environment Variables

**Minimal/Basic/React:**

- No environment variables required (configure in code)

**Express:**

```bash
# .env
OPENAI_API_KEY=your-api-key
PORT=3001
NODE_ENV=development
```

## Deployment

### Vercel (Recommended for React)

1. Push code to GitHub
2. Connect to Vercel
3. Configure environment variables
4. Deploy

### Railway (Express)

1. Connect GitHub repository
2. Configure environment variables
3. Deploy

### Netlify (React)

1. Connect GitHub repository
2. Build command: `pnpm build`
3. Publish directory: `dist`
4. Deploy

## Troubleshooting

### Common Issues

**Build Errors:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**TypeScript Errors:**

```bash
# Check TypeScript configuration
pnpm tsc --noEmit
```

**Port Already in Use:**

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Getting Help

- [Documentation](https://github.com/buildlayer/ai-cli)
- [Report Issues](https://github.com/buildlayer/ai-cli/issues)
- [Discussions](https://github.com/buildlayer/ai-cli/discussions)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
git clone https://github.com/buildlayer/ai-cli.git
cd ai-cli

# Install dependencies
pnpm install

# Start development
pnpm dev
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Express](https://expressjs.com/) - Web framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tetherai](https://github.com/nbursa/tetherai) - AI provider abstraction
  - [@tetherai/openai](https://github.com/nbursa/TetherAI/tree/main/packages/provider/openai) - OpenAI provider
  - [@tetherai/anthropic](https://github.com/nbursa/TetherAI/tree/main/packages/provider/anthropic) - Anthropic provider
  - [@tetherai/mistral](https://github.com/nbursa/TetherAI/tree/main/packages/provider/mistral) - Mistral provider
  - [@tetherai/grok](https://github.com/nbursa/TetherAI/tree/main/packages/provider/grok) - Grok provider
  - [@tetherai/local](https://github.com/nbursa/TetherAI/tree/main/packages/provider/local) - Local LLM provider

## Made with ❤️ by the BuildLayer.dev team
