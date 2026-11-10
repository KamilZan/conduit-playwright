# Conduit Playwright Framework

End-to-end test automation for the Conduit application using Playwright and TypeScript.

The suite validates the core article workflow in both UI and API-driven scenarios, including:

- user registration via API
- authenticated article creation from the UI
- article deletion after setup through the API
- execution across Chromium and Firefox browsers

## Table of contents

- Overview
- Tech stack
- Project structure
- Getting started
- Running tests
- Docker usage
- Reports

## Overview

This project uses Playwright's test runner to cover the `Conduit` application flow around article lifecycle management. It combines UI actions with API setup to keep tests deterministic and realistic.

Core test flow:

- create a generated user account with the API
- authenticate the browser session by injecting the JWT into local storage
- open the article editor
- publish a new article
- verify title and content on the article page
- delete an existing article and confirm redirect/back navigation

## Tech stack

- Playwright
- TypeScript
- Faker for generated test data
- Docker for containerized execution

## Project structure

```text
.
├── Dockerfile
├── docker-compose.yml
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── .env.example
├── fixtures/
│   └── test.fixture.ts
├── pages/
│   ├── article.page.ts
│   ├── base.page.ts
│   ├── LoginPage.ts
│   └── login.page.ts
├── tests/
│   └── ui/
│       └── articles.ui.spec.ts
├── utils/
│   ├── api-client.ts
│   └── test-data.generator.ts
├── playwright-report/
├── test-results/
└── README.md
```

## Getting started

### Prerequisites

- Node.js 18+
- npm
- a modern browser runtime for Playwright

### Install dependencies

```bash
npm install
```

### Configure environment variables

Copy the example file and adjust the values if needed:

```bash
copy .env.example .env
```

Example values:

```env
BASE_URL=https://api.realworld.io
UI_URL=https://realworld.app.is
```

If you do not provide a `.env` file, the project falls back to the defaults defined in `playwright.config.ts`:

- `BASE_URL=https://api.realworld.io`
- `UI_URL=https://angular.realworld.io`

## Running tests

Run the full suite in headless mode:

```bash
npm run test:headless
```

Run the suite in headed mode (browser UI visible):

```bash
npm run test:headed
```

Run a specific test file:

```bash
npx playwright test tests/ui/articles.ui.spec.ts
```

Run a specific browser project:

```bash
npx playwright test --project="Chromium E2E"
```

## Docker usage

Build and run the suite inside Docker:

```bash
docker compose up --build
```

This setup mounts the HTML report and test results folders so the output stays available on the host machine after the run.

## Reports

- HTML report: `playwright-report/`
- trace and screenshots: `test-results/`

The Playwright config is set to keep traces and screenshots for failed runs, which makes debugging test issues easier.

## Notes

The test suite is intentionally hybrid: it uses API calls for user creation and article setup, then validates the browser experience end to end. This keeps the tests faster and more stable while still asserting real frontend behavior.
