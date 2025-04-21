import "dotenv/config";

export const ENVS = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  BUILD_MODE: process.env.BUILD_MODE,
  PRIVATE_KEY_JWT: process.env.PRIVATE_KEY_JWT,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};
