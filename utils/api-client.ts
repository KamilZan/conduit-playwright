import { APIRequestContext, expect } from '@playwright/test';

export class ConduitApiClient {
  constructor(private request: APIRequestContext, private apiBaseUrl: string) {}

  async registerUser(email: string, username: string, password: string): Promise<string> {
    const response = await this.request.post(`${this.apiBaseUrl}/api/users`, {
      data: {
        user: { email, username, password }
      }
    });

    expect(response.status(), `Failed to register user via API: ${await response.text()}`).toBe(201);
    const body = await response.json();
    return body.user.token;
  }

  async createArticle(token: string, title: string, description: string, body: string, tagList: string[] = []) {
    const response = await this.request.post(`${this.apiBaseUrl}/api/articles`, {
      headers: {
        Authorization: `Token ${token}`
      },
      data: {
        article: { title, description, body, tagList }
      }
    });

    expect(response.status()).toBe(201);
    const resBody = await response.json();
    return resBody.article.slug;
  }
}
