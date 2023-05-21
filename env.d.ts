/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOCATION: string
  readonly VITE_API_PATH: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
