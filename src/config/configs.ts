import dotenv from "dotenv";

dotenv.config();

export const configs = {
  APP_PORT: process.env.APP_PORT || 3000,
  APP_HOST: process.env.APP_HOST,
  MONGO_URL: process.env.MONGO_URL,
};
