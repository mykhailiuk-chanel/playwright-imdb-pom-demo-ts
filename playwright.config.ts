// @ts-check
import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * =========================
 * Environment validation
 * =========================
 */
if (!process.env.BASE_URL) {
  throw new Error('❌ BASE_URL is not defined in .env file');
}

/**
 * =========================
 * Playwright configuration
 * @see https://playwright.dev/docs/test-configuration
 * =========================
 */

export default defineConfig({
  /**
   * Directory with test specs
   */
  testDir: './tests',
  /**
   * Global timeout for a single test
   * Maximum time one test can run for
   */
  timeout: 25_000,

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5_000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  // /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  // /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  /**
   * Reporter
   * (HTML or LIST is perfect for demo)
   * Reporter to use. See https://playwright.dev/docs/test-reporters
   * reporter: 'html',
   * Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions
   */
  reporter: [
    ['json', { outputFile: 'test-results/report.json' }],
    // ['list'],
    ['html', { open: 'never' }],
  ],
  /* Global Base URL validation before start tests*/
  globalSetup: './global-setup',
  use: {
    /**
     * Timeouts
     * Maximum time each action such as `click()` can take. Defaults to 0 (no limit).
     */
    actionTimeout: 5_000,
    navigationTimeout: 15_000,
    /**
     * Base URL from .env
     * Base URL to use in actions like `await page.goto('/')`.
     */
    baseURL: process.env.BASE_URL,
    /**
     * Artifacts
     */
    trace: 'on-first-retry',
    // screenshot: 'only-on-failure',
    screenshot: 'on',
    /**
     * Browser behavior
     */
    headless: false,
    viewport: { width: 1280, height: 800 },
    launchOptions: {
      slowMo: 500, // 500ms delay for all tests
    }
  },

  /* Configure projects for major browsers */
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    //TODO: Uncomment other browsers for cross-browser testing
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
});

