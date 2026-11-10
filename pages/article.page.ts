import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ArticlePage extends BasePage {
  private readonly titleInput: Locator;
  private readonly descriptionInput: Locator;
  private readonly bodyInput: Locator;
  private readonly tagsInput: Locator;
  private readonly publishButton: Locator;
  private readonly articleTitle: Locator;
  private readonly articleBody: Locator;
  private readonly deleteArticleBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.titleInput = page.getByPlaceholder('Article Title');
    this.descriptionInput = page.getByPlaceholder("What's this article about?");
    this.bodyInput = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsInput = page.getByPlaceholder('Enter tags');
    this.publishButton = page.getByRole('button', { name: 'Publish Article' });
    this.articleTitle = page.getByRole('heading', { level: 1 });
    this.articleBody = page.locator('.article-content p');
    this.deleteArticleBtn = page.getByRole('button', { name: 'Delete Article' }).first();
  }

  async createArticle(title: string, description: string, body: string, tags: string[] = []): Promise<void> {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.bodyInput.fill(body);
    
    for (const tag of tags) {
      await this.tagsInput.fill(tag);
      await this.tagsInput.press('Enter');
    }

    const responsePromise = this.page.waitForResponse(res => res.url().includes('/api/articles') && res.status() === 201);
    await this.publishButton.click();
    await responsePromise;
  }

  async verifyArticleContent(title: string, bodyText: string): Promise<void> {
    await expect(this.articleTitle).toHaveText(title);
    await expect(this.articleBody).toContainText(bodyText);
  }

  async deleteArticle(): Promise<void> {
    const responsePromise = this.page.waitForResponse(res => res.url().includes('/api/articles') && res.status() === 204);
    await this.deleteArticleBtn.click();
    await responsePromise;
  }
}
