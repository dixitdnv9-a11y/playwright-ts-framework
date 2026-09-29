import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  BASE_URL: process.env.BASE_URL || 'https://automationexercise.com',
  API_URL: process.env.API_URL || 'https://automationexercise.com/api',
  HEADLESS: process.env.HEADLESS !== 'false',
  SLOW_MO: parseInt(process.env.SLOW_MO || '0', 10),
  RETRIES: parseInt(process.env.RETRIES || '0', 10),
  WORKERS: process.env.CI ? 2 : parseInt(process.env.WORKERS || '4', 10),
};

export const TEST_USERS = {
  STANDARD_PASSWORD: process.env.TEST_PASSWORD || 'Test@12345',
};
