/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // faster analog ? 'happy-dom',
    setupFiles: './setupTest.ts',
    //css: true, // false ? to do rendering faster
    // ...
  },
});
