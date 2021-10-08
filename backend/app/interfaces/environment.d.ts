declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_PORT: number;
      TOKEN_KEY: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_DATABASE: string;
      DB_URL: string;
      DB_PORT: number;
    }
  }
}

export {};
