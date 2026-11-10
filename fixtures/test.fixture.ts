import { test as base, Page } from '@playwright/test';
import { ConduitApiClient } from '../utils/api-client';
import { generateUserData } from '../utils/test-data.generator';
import { BASE_URL } from '../playwright.config';

type AuthenticatedFixtures = {
  authenticatedPage: Page;
  userToken: string;
  userData: ReturnType<typeof generateUserData>;
  apiClient: ConduitApiClient;
};

export const test = base.extend<AuthenticatedFixtures>({
  apiClient: async ({ request }, use) => {
    const client = new ConduitApiClient(request, BASE_URL);
    await use(client);
  },

  userData: async ({}, use) => {
    const user = generateUserData();
    await use(user);
  },

  userToken: async ({ apiClient, userData }, use) => {
    const token = await apiClient.registerUser(userData.email, userData.username, userData.password);
    await use(token);
  },

  authenticatedPage: async ({ page, userToken }, use) => {
    await page.goto('/');
    await page.evaluate((token) => {
      window.localStorage.setItem('jwtToken', token);
    }, userToken);
    
    await page.goto('/');
    await use(page);
  },
});

export { expect } from '@playwright/test';
