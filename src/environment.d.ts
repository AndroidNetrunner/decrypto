declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_DB_URL: string;
      COOKIE_SECRET: string;
      NODE_ENV: 'development' | 'production';
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
      CLIENT_URL: string;
    }
  }
}

export {};
