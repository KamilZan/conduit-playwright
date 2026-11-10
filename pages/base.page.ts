import { expect, Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected page: Page) {}

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async expectUrl(pattern: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(pattern);
  }

  async waitForResponseUrl(urlSubstring: string, statusCode = 200): Promise<void> {
    await this.page.waitForResponse(
      response => response.url().includes(urlSubstring) && response.status() === statusCode
    );
  }
}
