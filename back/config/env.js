import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.APP_PORT || 4000,
  RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
  RAPIDAPI_HOST: process.env.RAPIDAPI_HOST,
};
