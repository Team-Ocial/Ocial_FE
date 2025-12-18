/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string; // 이 환경변수가 있다고 알려줌
}

interface ImportMeta {
  readonly env: ImportMetaEnv; // import.meta.env의 타입 정의
}
