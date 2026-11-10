import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export const BASE_URL = process.env.BASE_URL || 'https://api.realworld.io';
export const UI_URL = process.env.UI_URL || 'https://angular.realworld.io';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  use: {
    baseURL: UI_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
  },
  projects: [
    {
      name: 'Chromium E2E',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox E2E',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
