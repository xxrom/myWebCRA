/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { ImportMeta } from './src/env.d';
import path from 'path';
import wyw from '@wyw-in-js/vite';

/*
  import.meta.env - will be available in React only "VITE_*"
  process.env - available everywhere for all "*"
  console.log(import.meta.env, process.env);
*/

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.') as unknown as ImportMeta['env'];

  console.log('env', env);

  return {
    publicDir: 'public',
    plugins: [
      wyw({
        displayName: true,
        sourceMap: process.env.NODE_ENV !== 'production',
        include: ['**/*.{ts,tsx}'],
        babelOptions: {
          presets: [
            //'@babel/preset-env',
            '@babel/preset-typescript',
            '@babel/preset-react',
            //'@linaria',
          ],
          //plugins: ['@wyw-in-js/babel-preset'],
        },
      }),
      react(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: parseInt(env.VITE_PORT) || 4445,
    },
    define: {
      'process.env': {
        PUBLIC_URL: '',
      },
    },
    test: {
      globals: true,
      environment: 'jsdom', // faster analog ? 'happy-dom',
      setupFiles: './setupTest.ts',
      css: true, // false ? to do rendering faster
    },
  };
});
