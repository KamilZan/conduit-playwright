import { test, expect } from '../../fixtures/test.fixture';
import { ArticlePage } from '../../pages/article.page';
import { generateArticleData } from '../../utils/test-data.generator';

test.describe('Conduit - Article Lifecycle (Hybrid E2E)', () => {
  let page: ArticlePage;

  test.beforeEach(async ({ authenticatedPage }) => {
    page = new ArticlePage(authenticatedPage);
    await page.navigateTo('/editor');
  });

  test('User can create a new article via UI', async () => {
    const articleData = generateArticleData();

    await page.createArticle(
      articleData.title,
      articleData.description,
      articleData.body,
      articleData.tags
    );

    await page.verifyArticleContent(articleData.title, articleData.body);
  });

  test('User can delete an existing article (Setup via API)', async ({ apiClient, userToken }) => {
    const articleData = generateArticleData();

    const slug = await apiClient.createArticle(
      userToken,
      articleData.title,
      articleData.description,
      articleData.body
    );

    await page.navigateTo(`/article/${slug}`);
    await page.deleteArticle();

    await page.expectUrl(/\/$/);
  });
});

