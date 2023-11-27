/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // faster analog ? 'happy-dom',
    setupFiles: ['./setupTest.ts'],
    css: false, // false ? to do rendering faster
    // ...
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
