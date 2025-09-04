export const reactTemplates = {
  app: `import { App } from "@buildlayer/ai-react";
import "./index.css";

export default App;`,

  indexCss: (useTailwind: boolean) => {
    if (useTailwind) {
      return `@import "tailwindcss";
@import "@buildlayer/ai-react/dist/style.css";

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}`;
    }
    return `@import "@buildlayer/ai-react/dist/style.css";

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}`;
  },

  postcssConfig: `export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}`,
};
