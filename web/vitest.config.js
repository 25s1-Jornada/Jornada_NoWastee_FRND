// vitest.config.ts
import { defineConfig } from 'vitest/config';
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname), // Match your tsconfig path root
    },
  },
  test: {
    setupFiles: ['./__tests__/setup-tests.tsx'],
    environment: 'jsdom',
    globals: true,
  },
    esbuild: {
    jsxInject: 'import React from "react"',
  },
});
