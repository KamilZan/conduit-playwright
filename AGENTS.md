# Conduit Playwright Framework — Agent Instructions

A Playwright + TypeScript E2E test framework for the Conduit (RealWorld) application, using a hybrid API/UI approach.

## Build & Test Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run test:headless` | Run full suite headless |
| `npm run test:headed` | Run full suite with visible browser |
| `npx playwright test tests/ui/articles.ui.spec.ts` | Run specific file |
| `npx playwright test --project="Chromium E2E"` | Run specific browser |
| `docker compose up --build` | Run in Docker |

## Project Structure

```
tests/ui/          ← test specs (articles.ui.spec.ts)
fixtures/          ← custom fixtures with auth (test.fixture.ts)
pages/             ← Page Object Model classes
utils/             ← API client + test data generators
playwright.config.ts ← config, projects, timeouts
```

## Key Conventions

- **Page Object Model**: All UI interactions live in `pages/*.page.ts`, inheriting from `BasePage`. Never scatter selectors into spec files.
- **Hybrid E2E**: Use the `apiClient` fixture for setup (user registration, article creation) and the `authenticatedPage` fixture for UI validation. Tests combine API calls with browser assertions.
- **Authentication**: The `authenticatedPage` fixture (in `fixtures/test.fixture.ts`) injects a JWT into `localStorage` under the key `'jwtToken'`. Do not hardcode tokens in tests.
- **Test data**: Always use generators from `utils/test-data.generator.ts` (`generateUserData()`, `generateArticleData()`). Never hardcode emails or usernames — they must be unique per run.
- **Locators**: Use Playwright built-in locators (`getByRole`, `getByPlaceholder`, `getByTestId`). Avoid CSS/XPath selectors in pages.
- **Paths**: Import using `@pages/*`, `@fixtures/*`, `@utils/*` path aliases (configured in `tsconfig.json`).

## Architecture Notes

- `test.fixture.ts` extends Playwright's base fixture with `authenticatedPage`, `userToken`, `userData`, and `apiClient`.
- `ConduitApiClient` (in `utils/api-client.ts`) handles `registerUser` and `createArticle` calls against the RealWorld API.
- The config in `playwright.config.ts` sets `baseURL` to `UI_URL` and runs `Chromium E2E` + `Firefox E2E` projects in parallel.
- Traces and videos are kept on failure only; screenshots on failure only.

## API Endpoints

- Base API: `BASE_URL` env (default `https://api.realworld.io`)
- Base UI: `UI_URL` env (default `https://angular.realworld.io`)
- JWT key in localStorage: `'jwtToken'`

## Pitfalls

- **Do not** call `page.goto('/')` before injecting the JWT — the `authenticatedPage` fixture handles this automatically.
- **Do not** use `test` from `@playwright/test` directly in specs — always import from `../../fixtures/test.fixture` (the auth fixture).
- **Do not** add new projects without updating `playwright.config.ts` — it controls the browser matrix.
- **Do not** use `waitForTimeout` — use `waitForResponse` or `waitForLoadState` instead.
- Path aliases (`@pages/*`, `@utils/*`) require Node16 module resolution — they work in imports but not in dynamic `require()` calls.
