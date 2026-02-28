import { test as baseTest } from '@playwright/test';
// UI classes
import { HomePage } from '@src/pages/HomePage';
import { TopRatingPage } from '@src/pages/TopRatingPage';
import { SearchModule } from '@src/modules/SearchModule';
import { TopRatingModule } from '@src/modules/TopRatingModule';
// API classes
import { MovieApi } from '@src/api/MovieApi';

/**
 * Custom test fixtures extending Playwright's base test.
 * 
 * This file defines custom fixtures that provide page objects and business logic modules to tests.
 * It allows for better organization and reuse of common test components.
 */

type MyFixtures = {
  home: HomePage;
  topRating: TopRatingPage;
  searchModule: SearchModule;
  topRatingModule: TopRatingModule;
  movieApi: MovieApi;
};

type WorkerFixtures = {
  workerLogger: void;
};

/**
 * Extended test fixtures providing page objects and business logic modules.
 * 
 * Available fixtures:
 * - home: HomePage instance for UI interactions on home page
 * - topRating: TopRatingPage instance for top rated movies page
 * - searchModule: SearchModule for complex search workflows and business logic
 * - topRatingModule: TopRatingModule for Top 250 Movies business logic workflows
 */
export const test = baseTest.extend<MyFixtures, WorkerFixtures>({
  //TODO: only for DEMO by worker scope
  // workerLogger: [async ({}, use) => {
  //     await use();
  //     console.log('>>> [worker] Message AFTER ALL tests');
  //   },
  //   { scope: 'worker' }
  // ],
  home: async ({ page }, use, testInfo) => {
    await use(new HomePage(page));
    console.log(`>>> [home fixture] Message AFTER EACH test end: ${testInfo.title}`); //TODO: used only for DEMO to show fixtures life cycle
  },
  topRating: async ({ page }, use) => {
    await use(new TopRatingPage(page));
  },
  searchModule: async ({ home }, use) => {
    await use(new SearchModule(home));
  },
  topRatingModule: async ({ topRating }, use) => {
    await use(new TopRatingModule(topRating));
  },
  // API fixture
  movieApi: async ({ request }, use) => {
    await use(new MovieApi(request));
  }
});

export const expect = test.expect;