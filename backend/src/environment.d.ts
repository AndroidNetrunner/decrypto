declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      MONGO_DB_URL: string;
      MONGO_DB_USERNAME: string;
      MONGO_DB_PASSWORD: string;
      MONGO_DB_HOST: string;
      COOKIE_SECRET: string;
    }
  }
}

export {};
