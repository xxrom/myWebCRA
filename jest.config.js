//import type { Config } from '@jest/types';
import path from 'path';

/** @type {import('ts-jest').JestConfigWithTsJest} */
//module.exports = {
//preset: 'ts-jest',
//testEnvironment: 'jsdom', //'node',
//setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
//};
//const config: Config.InitialOptions = {

const config = {
  //preset: 'ts-jest',
  preset: 'vite-jest',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],

  //testEnvironment: 'ts-node', // 'jsdom', //'node',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};

const config2 = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '@': path.resolve('./src'),
  },
};
// eslint-disable-next-line import/no-default-export
export default config2;

//testEnvironment: 'jsdom',
// "test": "jest test --transformIgnorePatterns \"node_modules/(?!ui-core)/\" --env=jsdom",
