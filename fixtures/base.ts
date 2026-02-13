import { test as baseTest, Page } from '@playwright/test';
import { HomePage } from '@src/pages/HomePage';
import { TopRatingPage } from '@src/pages/TopRatingPage';
import { SearchModule } from '@src/modules/SearchModule';

type MyFixtures = {
  home: HomePage;
  topRating: TopRatingPage;
  searchModule: SearchModule;
};

/**
 * Extended test fixtures providing page objects and business logic modules.
 * 
 * Available fixtures:
 * - home: HomePage instance for UI interactions on home page
 * - topRating: TopRatingPage instance for top rated movies page
 * - searchModule: SearchModule for complex search workflows and business logic
 */
export const test = baseTest.extend<MyFixtures>({
  home: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  topRating: async ({ page }, use) => {
    await use(new TopRatingPage(page));
  },
  searchModule: async ({ home }, use) => {
    await use(new SearchModule(home));
  },
});

export const expect = test.expect;