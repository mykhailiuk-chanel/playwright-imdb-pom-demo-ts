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

2. **Business Logic Layer** (`modules/`)
   - Complex workflows and decision-making
   - Multi-step business operations
   - Cross-page orchestration

3. **UI Layer** (`pages/` + `components/`)
   - Page objects with element locators
   - Basic UI interactions (click, fill, navigation)
   - Reusable UI components
   - No business logic or conditional statements

**Key Principles:**
- Pages contain only UI abstraction (locators + actions)
- Modules encapsulate business workflows
- Tests focus on scenario orchestration and assertions
- Clear dependency flow: Tests -> Modules -> Pages

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

# Run tests by tag
npm run smoke
```

---

## Project Structure

```
src/
├── modules/                    # Business Logic Layer
│   └── SearchModule.ts        # Complex search workflows
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
tests/                          # Test Layer
├── home/
│   └── home.spec.ts       # Home page test scenarios
└── top/
    └── topRating.spec.ts       # Top rating movies test scenarios

fixtures/
├── base.ts                    # Custom fixtures and test setup
└── # Page objects and modules initialization

utils/                          # Helper utilities
└── # Helper functions and utilities

playwright.config.ts           # Playwright configuration
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

## Reporting and Risk Analysis

### Test Artifacts

- **Full test report** (`report.json`): Suite, test, and step-level details.
- **HTML report** (`playwright-report`): More clear and redbale report in HTML format.
- **Risk Report** (`test-results/risk-report.json`): Automated risk assessment.

### Risk Assessment

The framework automatically analyzes test failures and generates risk reports:

- Detects failed tests with `@high-level` tags
- Provides risk level summary:
  - HIGH RISK: At least one high-level test failed
  - LOW RISK: No high-level failures
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

3. **CI/CD Integration**
   - Configure automated test runs on commits and pull requests
   - Implement proper reporting and alerting on failures
   - Add parallel execution for faster feedback

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
