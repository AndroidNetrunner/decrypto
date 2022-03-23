declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      MONGO_DB_URL: string;
      COOKIE_SECRET: string;
    }
  }
}

export {};
