import { test as baseTest, Page } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { TopRatingPage } from '../src/pages/TopRatingPage';

type MyFixtures = {
  home: HomePage;
  topRating: TopRatingPage;
};

// Each test automatically receives fully initialized page objects
// Extend the base test fixtures by HomePage & TopFilms.
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = baseTest.extend<MyFixtures>({
  home: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  topRating: async ({ page }, use) => {
    await use(new TopRatingPage(page));
  },
});

export const expect = test.expect;