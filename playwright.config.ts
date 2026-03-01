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
  timeout: 45_000,

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
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 5,
  /**
   * Reporter
   * (HTML or LIST is perfect for demo)
   * Reporter to use. See https://playwright.dev/docs/test-reporters
   * reporter: 'html',
   * Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions
   */
  reporter: 
    process.env.CI 
      ? [['json', { outputFile: 'test-results/report.json' }], ['blob']] 
      : [
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
    actionTimeout: process.env.CI ? 15_000 : 5_000,
    navigationTimeout: process.env.CI ? 45_000 : 15_000,
    /**
     * Base URL from .env
     * Base URL to use in actions like `await page.goto('/')`.
     */
    baseURL: process.env.BASE_URL,
    /**
     * Artifacts
     */
    trace: 'on-first-retry',
    screenshot: 'on',
    /**
     * Browser behavior - applied to E2E and UI projects
     */
    headless: true,
    viewport: { width: 1280, height: 800 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  },

  /* Project-specific settings - applied on top of global use */
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'e2e',
      testDir: './tests/e2e',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          slowMo: process.env.CI ? 250 : 500, // Slow down for local debugging
        },
      },
    },
    {
      name: 'ui',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          slowMo: process.env.CI ? 250 : 500,
        },
      },
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: process.env.API_BASE_URL || process.env.BASE_URL,
        trace: 'on-first-retry',
        screenshot: 'on',
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
});

