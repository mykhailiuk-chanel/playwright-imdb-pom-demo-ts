<div align="center">

<img height="120" src="https://playwright.dev/img/playwright-logo.svg" alt="Playwright Logo"/>

# IMDb Playwright Automation Framework (POM + TypeScript)
</div>

---

## 🚀 About The Project

A Playwright automation framework built with **TypeScript** using **Page Object Model (POM)** and a **Business Logic Layer** for scalable end-to-end testing.

The project demonstrates **production-level automation practices**, including layered architecture, reusable modules, and CI/CD integration.

**Key Highlights:**
- **Playwright + TypeScript**
- **Three-layer architecture**
- **Page Object Model (POM)**
- **Business Logic Layer (Modules)**
- **API + UI + E2E tests**
- **Parallel CI execution (GitHub Actions)**
- **Tag-based test execution**
- **Structured reporting and risk analysis**

---

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/mykhailiuk-chanel/playwright-imdb-pom-demo-ts.git
cd playwright-imdb-pom-demo-ts
```

2. Install dependencies:

```bash
npm install
```

3. Set the `BASE_URL=https://www.imdb.com/` in `.env` variables (or create a new `.env` based on the `env-example.txt` example)

4. Run tests:

```bash
# Run all smoke tests
npm run smoke

# Run tests by project type (e2e, ui, api)
npm run test:e2e      # Run E2E tests only
npm run test:ui       # Run UI tests only
npm run test:api      # Run API tests only

# Run all tests
npm test
```

### Test Tagging and Filtering

Tag tests for selective execution: `@smoke`, `@high-level`, `@medium-level`.

Run smoke tests only:

```bash
npx playwright test --project=e2e --grep @smoke
```

---

## 🚀 CI/CD Pipeline

This project includes a **production-ready GitHub Actions workflow** demonstrating parallel test execution across multiple CI/CD machines.

### Parallel Execution Strategy

```
┌──────────────────┐        ┌──────────────────┐
│   🏠 home-tests  │        │⭐ top-rating-tests│
│   (Machine 1)    │        │   (Machine 2)    │
│                  │        │                  │
│ • tests/home/    │        │ • topRating.spec │
│ • Browser title  │        │ • Top 250 Movies │
│ • Search flow    │        │ • Movie details  │
└────────┬─────────┘        └────────┬─────────┘
         │                           │
         └───────────┬───────────────┘
                     │
            ┌────────▼────────┐
          │ 📊 aggregate-results  │
          │   (Final Report)      │
          │   MERGED-HTML-REPORT  │
            └─────────────────┘
```

### Features

- ✅ **Parallel Jobs**: Tests run simultaneously on separate GitHub-hosted runners
- ✅ **Time Savings**: ~45% faster than sequential execution
- ✅ **Smart Reporting**: Automated PR comments and artifact collection
- ✅ **Secret Management**: Environment variables stored securely
- ✅ **Matrix Support**: Ready for cross-browser parallel execution

### Workflow Triggers

- **Manual**: `workflow_dispatch` with input options
- **Automatic**: Push to `main`/`master` or pull requests

### Running Locally

Execute the same commands used in CI:

```bash
# Home page tests (Job 1)
npx playwright test tests/home/ --reporter=list,json

# Top rating tests (Job 2)
npx playwright test tests/top/topRating.spec.ts --reporter=list,json
```

> **Full Documentation**: See [`docs/CICD.md`](docs/CICD.md) for detailed architecture and customization options.

---

## Project Structure

```
src/
├── api/                     # API Layer - REST API client implementations
│   ├── BaseApi.ts           # Base class with common HTTP methods (GET, POST...)
│   └── MovieApi.ts          # Movie-specific endpoint methods
│
├── modules/                   # Business Logic Layer
│   ├── SearchModule.ts        # Complex search workflows
│   └── TopRatingModule.ts     # Top 250 movies workflows
│   # Add more modules as needed:
│   # - UserModule.ts          # User-related workflows
│   # - CheckoutModule.ts      # Purchase workflows
│   # - AuthenticationModule.ts # Login/logout flows
│
├── pages/                      # UI Layer - Page Objects
│   ├── BasePage.ts            # Base class with common functionality
│   ├── HomePage.ts            # Home page locators and actions
│   └── TopRatingPage.ts       # Top ratings page
│
├── components/                 # UI Layer - Reusable Components
│   ├── Footer.ts              # Footer component
│   ├── Menu.ts                # Navigation menu
│   └── MovieInfo.ts           # Movie information display
│
tests/                          # Test Layer - Three categories
│
│   ├── e2e/                   # E2E Tests - Full user journey tests
│   │   ├── home/
│   │   │   └── home.ui.spec.ts
│   │   └── top/
│   │       └── topRating.spec.ts
│   │
│   ├── ui/                    # UI Tests - Component-level verification
│   │   └── home/
│   │       └── home.ui.spec.ts
│   │
│   └── api/                   # API Tests - REST endpoint validation
│       └── movie/
│           └── movie.api.spec.ts
│
fixtures/
├── base.ts                    # Custom fixtures and test setup
└── # Page objects, modules, and API clients initialization

utils/                          # Helper utilities
└── # Helper functions and utilities

playwright.config.ts           # Playwright configuration with project definitions
```

**Benefits:**
- **Maintainability:** Change UI without affecting business logic
- **Reusability:** Modules can be shared across multiple test suites
- **Testability:** Business logic can be unit tested independently
- **Clarity:** Clear separation of concerns
- **Scalability:** Easy to add new modules without modifying existing pages

---

### API Layer

The framework includes a dedicated API layer for testing REST endpoints independently or as part of E2E workflows.

**Architecture:**

```typescript
// src/api/BaseApi.ts - Base HTTP client
class BaseApi {
  constructor(private request: APIRequestContext) {}
  
  async get<T>(endpoint: string): Promise<T>
  async post<T>(endpoint: string, data?: unknown): Promise<T>
  ...
}

// src/api/MovieApi.ts - Endpoint-specific methods
class MovieApi {
  async searchMovies(query: string): Promise<SearchResponse>
  async getMovieDetails(movieId: string): Promise<MovieDetails>
  async getTopRated(): Promise<TopRatedResponse>
}
```

**Test Categories:**

| Category | Directory | Purpose | Example |
|----------|-----------|---------|---------|
| E2E | `tests/e2e/` | Full user journeys with UI + API | Search movie and verify in UI |
| UI | `tests/ui/` | Component-level UI verification | Footer copyright text |
| API | `tests/api/` | REST endpoint validation | API response structure |

---

## Reporting and Risk Analysis

### Test Artifacts

- **Full test report** (`report.json`): Suite, test, and step-level details.
- **HTML report** (`playwright-report`): More clear and redbale report in HTML format.
- **Risk Report** (`test-results/risk-report.json`): Automated risk assessment.

### Risk Assessment

The framework automatically analyzes test failures and generates risk reports:

- Detects failed tests with `@high-level` tags
- Provides risk level summary:
  - 🚨 HIGH RISK: At least one high-level test failed -> 🔁 Immediate rerun required (high-level scenario failed)
  - 🟢 LOW RISK: No high-level failures -> ✅ Rerun optional (no high-level failures)
- Suggests immediate reruns for critical scenarios
- Screenshots and error context saved for failed tests

### Generate Risk Report

1. Execute tests to generate base report:

```bash
npm run test
```

2. Generate risk analysis (useful when many tests fail):

```bash
npm run risk:report
```

3. Review the risk report at `test-results/risk-report.json`

---

## Best Practices

### Page Objects

- Keep pages focused on UI abstraction only
- Expose locators as public readonly properties for assertions
- Methods should perform single actions (click, fill, navigate)
- Never include if/else logic or business decisions in pages

### Business Modules

- Encapsulate complex workflows that span multiple pages
- Handle decision-making and conditional logic
- Perform cross-page orchestration
- Keep business rules centralized and reusable

### Tests

- Use descriptive test names and step annotations
- Keep tests focused on scenario orchestration
- Perform assertions at the test level, not in pages or modules
- Use fixtures for dependency injection

### Locators

- Prefer Playwright's built-in methods (`getByTestId`, `getByRole`)
- Avoid CSS/XPath selectors when semantic alternatives exist
- Use data-testid attributes for stable locators
- Document any non-obvious locator choices

---

## Roadmap

This framework serves as a foundation for production E2E automation. Recommended next steps:

1. **Requirement Analysis**
   - Collaborate with stakeholders to identify critical user journeys
   - Document high-level acceptance criteria for automation coverage

2. **Advanced Features**
   - API integration for test data setup/teardown
   - Visual regression testing
   - Cross-browser testing configuration
   - Performance monitoring integration

---

## Author

**Vitaliy Mykhailiuk** - Senior Automation QA Engineer
> 💡 email for cooperation -> vmykhailiuk.chanel@gmail.com 
