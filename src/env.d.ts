/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly VITE_PORT: string;
  // more env variables...
};

export type ImportMeta = {
  readonly env: ImportMetaEnv;
};
