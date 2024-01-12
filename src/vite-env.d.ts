/// <reference types="vite/client" />

// type Vitest = import('vitest');

interface ImportMetaEnv {
  readonly VITE_FB_API_KEY: string;
  readonly VITE_FB_PROJECT_ID: string;
  readonly VITE_FB_MSG_SENDER_ID: string;
  readonly VITE_FB_API_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
