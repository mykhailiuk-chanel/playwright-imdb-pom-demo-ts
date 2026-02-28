# IMDb Playwright Automation Framework (POM + TypeScript)

A production-ready Playwright automation framework built with TypeScript, implementing the Page Object Model (POM) pattern with an additional Business Logic Layer for scalable and maintainable end-to-end testing.

This framework demonstrates professional test automation practices for real-world web applications, emphasizing:

- Three-layer architecture: Test Layer, Business Logic Layer, UI Layer
- Strict separation of concerns (no business logic in Page classes)
- Comprehensive test tagging and selective execution
- Production-grade reporting and risk analysis
- Reliable locator strategies using Playwright best practices

**Note:** It is recommended to clone the repository to preserve all configurations and sample tests.

---

## 🎯 Purpose

This framework was created to demonstrate enterprise-grade test automation practices:

- Framework architecture using Playwright + TypeScript
- Page Object Model with Business Logic Layer separation
- Automated tests for critical user flows on IMDb
- Playwright locator strategies and best practices
- Structured reporting with risk assessment capabilities

---

## Features

### Test Architecture

**Three-Layer Architecture:**

1. **Test Layer** (`tests/`)
   - Test scenarios and orchestration
   - Assertions and validations
   - Test data management
   - Organized into three categories:
     - **E2E Tests** (`tests/e2e/`): Full user journey tests covering end-to-end workflows
     - **UI Tests** (`tests/ui/`): Component-level UI verification tests
     - **API Tests** (`tests/api/`): REST API endpoint validation tests

2. **Business Logic Layer** (`modules/`)
   - Complex workflows and decision-making
   - Multi-step business operations
   - Cross-page orchestration

3. **API Layer** (`src/api/`)
   - REST API client implementations
   - HTTP request/response handling
   - Endpoint-specific methods for test data setup and validation
   - Reusable across E2E and API tests

4. **UI Layer** (`pages/` + `components/`)
   - Page objects with element locators
   - Basic UI interactions (click, fill, navigation)
   - Reusable UI components
   - No business logic or conditional statements

**Key Principles:**
- Pages contain only UI abstraction (locators + actions)
- Modules encapsulate business workflows
- API classes handle HTTP communications
- Tests focus on scenario orchestration and assertions
- Clear dependency flow: Tests -> Modules/Pages/Apis

### Test Tagging and Filtering

Tag tests for selective execution: `@smoke`, `@high-level`, `@medium-level`.

Run smoke tests only:

```bash
npx playwright test --grep @smoke
```

### Network and Precondition Safety

- URL availability check before test execution to prevent false negatives
- Graceful handling of unreachable pages with clear warning messages
- Reduced noise in CI/CD pipelines from connectivity failures

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
# Run all tests
npm test

# Run tests by project type (e2e, ui, api)
npm run test:e2e      # Run E2E tests only
npm run test:ui       # Run UI tests only
npm run test:api      # Run API tests only

# Run smoke tests by project
npm run smoke:e2e     # E2E smoke tests
npm run smoke:ui      # UI smoke tests  
npm run smoke:api     # API smoke tests

# Run all smoke tests
npm run smoke
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
            │ 📊 aggregate-results│
            │   (Final Report)  │
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

### Why This Architecture?

**Without Business Logic Layer (Traditional POM):**
```typescript
// Page contains business logic - BAD
class HomePage {
    async searchAndOpenFilm(name: string) {
        await this.fillSearchField(name);
        await this.openFirstSearchResult();
        if (await this.noResultsMessage.isVisible()) {  // Business logic in Page!
            throw new Error('No results found');
        }
        await this.verifyHeader(name);  // Verification in Page!
    }
}
```

**With Business Logic Layer (This Framework):**
```typescript
// Page - UI only
type HomePage {
    async fillSearchField(name: string): Promise<void>
    async openFirstSearchResult(): Promise<void>
    readonly searchResultsList: Locator
}

// Module - Business logic
type SearchModule {
    async searchAndOpenFilm(name: string): Promise<void> {
        await this.homePage.fillSearchField(name);
        await this.homePage.openFirstSearchResult();
        // Business decisions, validations, and workflows here
    }
}

// Test - Orchestration
test('search for movie', async ({ searchModule }) => {
    await searchModule.searchAndOpenFilm('The Wolf of Wall Street');
    // Assertions here
});
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

**Running API Tests:**

```bash
# Run all API tests
npm run test:api

# Run API smoke tests
npm run smoke:api

# Debug API tests
npm run debug:api
```

**Using API in Tests:**

```typescript
// Direct API testing
test('should return search results', async ({ movieApi }) => {
  const response = await movieApi.searchMovies('Inception');
  expect(response.results).toBeDefined();
});

// E2E with API setup (test data preparation)
test('should verify movie in UI after API update', async ({ movieApi, page }) => {
  // Prepare test data via API
  await movieApi.updateMovieRating('tt0468569', 9.0);
  
  // Verify in UI
  await page.goto('/title/tt0468569');
  await expect(page.locator('.rating')).toContainText('9.0');
});
```

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

2. **Coverage Expansion**
   - Implement high-level scenarios as smoke tests
   - Gradually add medium- and low-priority scenarios for full regression

3. **CI/CD Integration** ✅ COMPLETED
   - GitHub Actions workflow with parallel job execution
   - Automated test runs on commits and pull requests
   - Parallel execution across multiple machines (jobs)
   - Comprehensive reporting and artifact collection

4. **Framework Scaling**
   - Add new pages following the three-layer architecture
   - Create new modules for additional business workflows
   - Centralize reusable fixtures and test data
   - Implement data-driven testing capabilities

5. **Advanced Features**
   - API integration for test data setup/teardown
   - Visual regression testing
   - Cross-browser testing configuration
   - Performance monitoring integration

---

## Author

**Vitaliy Mykhailiuk** - Senior Automation QA Engineer
> 💡 email for cooperation -> vmykhailiuk.chanel@gmail.com 
