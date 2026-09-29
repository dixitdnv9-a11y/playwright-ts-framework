import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv'; dotenv.config();
const isCI = !!process.env.CI;
export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // FIXED: was true causing serial tests to fail
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 2 : 2, // FIXED: 2 workers not 4 to avoid cart pollution
  timeout: 90*1000,
  expect: { timeout: 20*1000 },
  reporter: [['list'], ['html', {open:'never'}], ['junit',{outputFile:'test-results/junit.xml'}]],
  use: {
    baseURL: process.env.BASE_URL || 'https://automationexercise.com',
    trace: isCI ? 'on-first-retry' : 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15*1000,
  },
  projects: [
    { name: 'chromium', use: {...devices['Desktop Chrome']} },
    // Removed duplicate smoke/regression projects that caused 81 tests (27x3)
    // Use grep via CLI: npx playwright test --grep @smoke
  ],
});
