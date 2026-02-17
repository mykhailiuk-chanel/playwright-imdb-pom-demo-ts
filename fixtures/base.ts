import { test as baseTest, Page } from '@playwright/test';
import { HomePage } from '@src/pages/HomePage';
import { TopRatingPage } from '@src/pages/TopRatingPage';
import { SearchModule } from '@src/modules/SearchModule';
import { TopRatingModule } from '@src/modules/TopRatingModule';

type MyFixtures = {
  home: HomePage;
  topRating: TopRatingPage;
  searchModule: SearchModule;
  topRatingModule: TopRatingModule;
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
});

export const expect = test.expect;