import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.getByPlaceholder('email').fill(email);
    await this.page.getByPlaceholder('password').fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
  }

  async assertLoggedIn(): Promise<void> {
    await expect(this.page).toHaveURL(/\/\s*$/);
    await expect(this.page.getByText('Your Feed')).toBeVisible();
  }

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }
}
