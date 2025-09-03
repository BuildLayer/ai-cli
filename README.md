# @buildlayer/ai-cli

> A powerful command-line tool for creating AI-powered chat applications with React and TypeScript

[![npm version](https://badge.fury.io/js/@buildlayer%2Fai-cli.svg)](https://badge.fury.io/js/@buildlayer%2Fai-cli)
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

Creates a new AI chat application with modern React setup.

```bash
ai-cli create <project-name> [options]
```

**Options:**

- `--template <template>` - Choose template (basic, nextjs) [default: basic]
- `--typescript` - Use TypeScript [default: true]
- `--no-typescript` - Use JavaScript instead of TypeScript
- `--tailwind` - Include Tailwind CSS [default: true]
- `--no-tailwind` - Skip Tailwind CSS
- `--directory <path>` - Specify project directory

**Examples:**

```bash
# Create basic React app with TypeScript and Tailwind
ai-cli create my-chat-app

# Create JavaScript app without Tailwind
ai-cli create my-chat-app --no-typescript --no-tailwind

# Create Next.js app
ai-cli create my-chat-app --template nextjs

# Create in specific directory
ai-cli create my-chat-app --directory /path/to/projects
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

## What Gets Created

When you run `ai-cli create`, you get a complete React application with:

### Project Structure

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

### Included Dependencies

**Core Dependencies:**

- `react` - React 18
- `react-dom` - React DOM
- `@buildlayer/ai-core` - AI UI SDK core functionality
- `@buildlayer/ai-react` - React components for AI chat

**Development Dependencies:**

- `typescript` - TypeScript support
- `vite` - Fast build tool
- `@vitejs/plugin-react` - React plugin for Vite
- `tailwindcss` - Utility-first CSS framework
- `autoprefixer` - CSS vendor prefixes
- `postcss` - CSS post-processing

### Features

**AI Chat Application:**

- Modern React 18 with TypeScript
- OpenAI API integration
- Responsive chat interface
- Tailwind CSS styling
- Vite for fast development
- Hot module replacement

**Chat Components:**

- `ChatPanel` - Main chat interface
- `ChatStore` - State management
- `OpenAIAdapter` - OpenAI API integration
- Real-time messaging
- Message history
- Error handling

## Configuration

### TypeScript Configuration

The generated `tsconfig.json` includes:

- Strict type checking
- Modern ES modules
- React JSX support
- Path mapping for clean imports

### Vite Configuration

The generated `vite.config.ts` includes:

- React plugin
- Development server on port 3000
- Auto-open browser
- Hot module replacement

### Tailwind CSS Configuration

The generated `tailwind.config.js` includes:

- Content paths for all source files
- Extensible theme configuration
- PostCSS integration

## Getting Started

After creating your project:

```bash
cd my-ai-chat-app

# npm
npm install
npm run dev

# pnpm
pnpm install
pnpm dev

# yarn
yarn install
yarn dev
```

Your AI chat application will be available at `http://localhost:3000`.

### Setting Up OpenAI API

1. Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Enter your API key in the application
3. Start chatting with AI!

## API Reference

### ChatStore

```typescript
import { ChatStore, OpenAIAdapter } from '@buildlayer/ai-core';

const adapter = new OpenAIAdapter({ apiKey: 'your-api-key' });
const store = new ChatStore(adapter);
```

### ChatPanel

```typescript
import { ChatPanel } from '@buildlayer/ai-react';

<ChatPanel chatController={store} />
```

## Templates

### Basic Template (Default)

- React 18 with TypeScript
- Vite build system
- Tailwind CSS
- AI chat components

### Next.js Template (Coming Soon)

- Next.js 14 with App Router
- Server-side rendering
- API routes for AI integration

### Vue Template (Coming Soon)

- Vue 3 with Composition API
- Vite build system
- Tailwind CSS

## Troubleshooting

### Common Issues

**Build Errors:**

```bash
# Clear node_modules and reinstall

# npm
rm -rf node_modules package-lock.json
npm install

# pnpm
rm -rf node_modules pnpm-lock.yaml
pnpm install

# yarn
rm -rf node_modules yarn.lock
yarn install
```

**TypeScript Errors:**

```bash
# Check TypeScript configuration

# npm
npx tsc --noEmit

# pnpm
pnpx tsc --noEmit

# yarn
yarn dlx tsc --noEmit
```

**Tailwind CSS Not Working:**

```bash
# Ensure PostCSS is configured

# npm
npm install -D tailwindcss postcss autoprefixer

# pnpm
pnpm add -D tailwindcss postcss autoprefixer

# yarn
yarn add -D tailwindcss postcss autoprefixer
```

### Getting Help

- [Documentation](https://github.com/buildlayer/ai-ui-sdk)
- [Report Issues](https://github.com/buildlayer/ai-ui-sdk/issues)
- [Discussions](https://github.com/buildlayer/ai-ui-sdk/discussions)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
git clone https://github.com/buildlayer/ai-ui-sdk.git
cd cli

# npm
npm install
npm run dev

# pnpm
pnpm install
pnpm dev

# yarn
yarn install
yarn dev
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [OpenAI](https://openai.com/) - AI API
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tetherai](https://github.com/nbursa/tetherai) - AI provider abstraction
  - [@tetherai/openai](https://github.com/nbursa/TetherAI/tree/main/packages/provider/openai) - OpenAI provider
  - [@tetherai/anthropic](https://github.com/nbursa/TetherAI/tree/main/packages/provider/anthropic) - Anthropic provider
  - [@tetherai/mistral](https://github.com/nbursa/TetherAI/tree/main/packages/provider/mistral) - Mistral provider
  - [@tetherai/grok](https://github.com/nbursa/TetherAI/tree/main/packages/provider/grok) - Grok provider
  - [@tetherai/local](https://github.com/nbursa/TetherAI/tree/main/packages/provider/local) - Local LLM provider

## Made with ❤️ by the BuildLayer.dev team
