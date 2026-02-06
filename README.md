# IMDb Playwright Automation Boilerplate (POM + TypeScript)

Welcome to the IMDb Playwright automation boilerplate, built using **Playwright** and **TypeScript**, following the **Page Object Model (POM)**.  
This project demonstrates a **scalable, maintainable, and professional approach** to automating end-to-end (E2E) web testing for real-world web applications like IMDb.

It is designed as a foundation for high-quality automated test suites, emphasizing:

- Clear **Page Object Model (POM)** structure.
- Tagging and selective test execution (`@smoke`, `@high-level`, `@medium-level`).
- Comprehensive **reporting and risk analysis**.
- Reliable locators using Playwright’s methods (`getByRole`, `getByTestId`, etc.).

> ⚠️ **Note:** It is recommended to **clone the repository** rather than install via NPM, to preserve all configurations and sample tests.

---

## 🎯 Purpose

This boilerplate was created as a **test automation engineer task** to demonstrate:

- Framework setup using Playwright + TypeScript.
- Page Object Model design for maintainable page interactions.
- Automated tests for common user flows on IMDb.
- Using Playwright locators practices.
- Structured reporting and risk assessment.

---

## 🔹 Features & Highlights

### ✅ Test Architecture
- **Page Object Model (POM)** for reusable page interactions.
- Modular **fixtures** for browser setup, authentication, and common flows.
- Clear **test organization** with `test.describe` blocks, preconditions, and detailed steps.

### 🏷 Test Tagging & Filtering
- Tag tests for **selective execution**: `@smoke`, `@high-level`, `@medium-level`.
- Example: Run smoke tests only:

```bash
npx playwright test --grep @smoke
```

---

### 🌐 Network & Precondition Safety

- URL availability check before test execution to prevent false negatives due to network issues.
- Graceful handling of unreachable pages:
  - Tests will skip or log clear warnings if the target URL is down.
  - Reduces noise in CI/CD pipelines caused by connectivity failures.

---

### 📊 Reporting & Risk Analysis

- **Last-run JSON** (`.last-run.json`) capturing the latest test status and failed test IDs.
- **Full test report** (`report.json`) with suite, test, and step-level details.
- **Automated Risk Report**:
  - Detects failed tests with `@high-level` tags.
  - Provides a **friendly summary with emojis**:
    - 🚨 HIGH RISK – at least one high-level test failed.
    - 🟢 LOW RISK – no high-level failures.
  - Suggests **immediate reruns** for critical scenarios.
- Screenshots and error context are automatically saved for failed tests.


## 🛠 Installation & Setup

1. **Clone the repository** (recommended over NPM install for full demo):

```bash
git clone https://github.com/mykhailiuk-chanel/playwright-imdb-pom-demo-ts.git
cd playwright-imdb-pom-demo-ts
```

2. Install dependencies::

```bash
npm install
```

3. Set the `BASE_URL=https://www.imdb.com/` in `.env` variables (or creaete a new `.env` based on the `env-example.txt` example)

4. Run tests:
- all tests: `npm test`
- tests by tag: `npm run smoke`

---

### 📁 Project Structure

This project follows a scalable **Page Object Model (POM)** design pattern with **Playwright + TypeScript**.  

- `pages/` – Page objects for all main pages.
- `components/` – Reusable UI components (menu, movie info, etc.).
- `tests/` – Test specs organized by feature or page.
- `fixtures/` – Custom fixtures and test setup.
- `utils/` – Helper functions and utilities.
- `playwright.config.ts` – Playwright configuration (browser, reporter, base URL, etc.).

---

### 🚀 Next Steps / Roadmap

This boilerplate serves as a starting point for building a robust E2E automation suite. Recommended next steps include:

1. **Understand the business requirements**
   - Collaborate with product owners and stakeholders to identify critical user journeys.
   - Document high-level acceptance criteria for automation coverage.

2. **Expand automated coverage**
   - Identify **high-level scenarios** and implement them as **smoke tests**.
   - Gradually cover **medium- and low-priority scenarios** to build a full regression suite.

3. **Integrate CI/CD pipelines**
   - Configure automated test runs on commits, pull requests, or scheduled intervals.
   - Ensure proper reporting and alerting on failures.

4. **Maintainable scaling**  
   - Add new pages and features following **Page Object Model** principles.
   - Keep reusable fixtures, helpers, and test data centralized to reduce duplication.
...
> 💡 Pro Tip: Prioritize smoke and high-level scenarios first to ensure that critical functionality is always validated in every build. Gradually expand coverage without compromising maintainability.