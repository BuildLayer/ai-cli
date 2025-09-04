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
- `nextjs` - Next.js app with SSR and AI chat
- `express` - Backend API server with AI chat endpoints
- `fullstack` - Complete full-stack app with authentication and database

**Options:**

- `--no-typescript` - Use JavaScript instead of TypeScript (default: TypeScript enabled)
- `--no-tailwind` - Skip Tailwind CSS (default: Tailwind enabled)
- `--database <type>` - Database type for fullstack preset (sqlite, postgres, mysql) [default: sqlite]
- `--auth <provider>` - Auth provider for fullstack preset (nextauth, clerk, auth0) [default: nextauth]
- `--deploy <platform>` - Deploy target (vercel, netlify, railway) [default: vercel]

**Examples:**

```bash
# Create React app with TypeScript and Tailwind (default)
ai-cli create my-chat-app

# Create minimal console app
ai-cli create minimal my-console-chat

# Create JavaScript app without Tailwind
ai-cli create basic my-js-app --no-typescript --no-tailwind

# Create Next.js app
ai-cli create nextjs my-nextjs-app

# Create Express API server
ai-cli create express my-api-server

# Create full-stack app with PostgreSQL and NextAuth
ai-cli create fullstack my-fullstack-app --database postgres --auth nextauth

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

### ⚡ Next.js

Next.js application with server-side rendering and AI chat.

**Best for:** SEO-friendly apps, server-side rendering, full-stack React

```bash
ai-cli create nextjs my-nextjs-app
```

**Features:**

- Next.js 15 with App Router
- Server-side rendering
- @buildlayer/ai-react integration
- Tailwind CSS
- TypeScript support
- API routes ready

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

### 🏗️ Full-Stack

Complete full-stack application with authentication and database.

**Best for:** Production applications, user management, data persistence

```bash
ai-cli create fullstack my-fullstack-app
```

**Features:**

- Next.js 15 frontend
- Prisma ORM with database
- NextAuth.js authentication
- OAuth providers (Google, GitHub)
- Chat session persistence
- User management
- TypeScript support

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

### Full-Stack Project Structure

```text
my-fullstack-app/
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── page.tsx     # Main page
│   │   ├── layout.tsx   # Root layout
│   │   └── api/         # API routes
│   ├── components/      # React components
│   └── lib/             # Utilities
├── prisma/
│   └── schema.prisma    # Database schema
├── package.json         # Dependencies
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS
└── .env.local          # Environment variables
```

## Included Dependencies

### Core Dependencies

- `@buildlayer/ai-core` - AI chat engine and store
- `@buildlayer/ai-react` - React UI components (React/Next.js presets)

### Framework Dependencies

**React/Next.js:**

- `react` - React 18
- `react-dom` - React DOM
- `react-router-dom` - Client-side routing (React preset)

**Next.js:**

- `next` - Next.js 15
- `@next-auth/prisma-adapter` - NextAuth database adapter (fullstack)

**Express:**

- `express` - Web framework
- `cors` - CORS middleware
- `helmet` - Security middleware
- `ws` - WebSocket support

**Database (Full-Stack):**

- `@prisma/client` - Database ORM
- `prisma` - Database toolkit

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

**Full-Stack:**

```bash
# Configure environment variables in .env.local
# Set up database
pnpm db:push
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

**Full-Stack:**

```bash
# .env.local
DATABASE_URL="postgresql://username:password@localhost:5432/database"
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
OPENAI_API_KEY=your-openai-api-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Deployment

### Vercel (Recommended for React/Next.js)

1. Push code to GitHub
2. Connect to Vercel
3. Configure environment variables
4. Deploy

### Railway (Express/Full-Stack)

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

**Database Issues (Full-Stack):**

```bash
# Reset database
pnpm db:push
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
- [Next.js](https://nextjs.org/) - React framework
- [Express](https://expressjs.com/) - Web framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Prisma](https://prisma.io/) - Database ORM
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tetherai](https://github.com/nbursa/tetherai) - AI provider abstraction
  - [@tetherai/openai](https://github.com/nbursa/TetherAI/tree/main/packages/provider/openai) - OpenAI provider
  - [@tetherai/anthropic](https://github.com/nbursa/TetherAI/tree/main/packages/provider/anthropic) - Anthropic provider
  - [@tetherai/mistral](https://github.com/nbursa/TetherAI/tree/main/packages/provider/mistral) - Mistral provider
  - [@tetherai/grok](https://github.com/nbursa/TetherAI/tree/main/packages/provider/grok) - Grok provider
  - [@tetherai/local](https://github.com/nbursa/TetherAI/tree/main/packages/provider/local) - Local LLM provider

## Made with ❤️ by the BuildLayer.dev team
