import { test, expect } from '../../fixtures/base';
import { FILMS } from '../../test-data/films';
import { SITE } from '../../test-data/site';

/**
 * [Home Page Movie Search Validation]
 *
 * PURPOSE:
 * Verify that a guest user can search for a movie from the IMDb Home page
 * and successfully open the movie details page.
 *
 * COVERAGE:
 * - Movie search functionality
 * - Navigation from search results to movie details page
 *
 * PRECONDITION:
 * Guest user opens the IMDb Home page.
 *
 * CASES:
 * Automation_Script_1.1: Verify that user can search for a movie by name.
 * *Expected*: The movie appears in the search results.
 *
 * Automation_Script_1.2: Verify that movie details page opens after selecting a movie.
 * *Expected*: The movie title on the details page matches the searched movie name.
 * 
 * Automation_Script_1.3: Verify that footer has corporate copyright text.
 * *Expected*: The footer displays the correct corporate copyright information.
 *
 * Author: Mykhailiuk Vitaliy (Senior Automation QA)
 */

test.describe('Home Page - Movie Search Validation', {
    tag: ['@smoke', '@high-level', '@home', '@search'],
},() => {
    test.beforeEach(async ({ home }) => {
        await test.step('Navigate to IMDb Home page', async () => {
            await home.goto();
        });
    });

    test('should display correct browser title', async ({ home }) => {
        await test.step('Verify browser title displays "IMDb: Ratings, Reviews, and Where to Watch..."', async () => {
            const title = await home.getPageTitle();
            expect(title).toBe(SITE.title);
        });
    });

    test('should allow user to search for a movie and open its details page', async ({ home }) => {       
        await test.step('Search for movie', async () => {
            await home.searchForFilm(FILMS.wolf.title);
            expect(await home.isSearchResultsVisible()).toBeTruthy();
        });

        await test.step('Open movie details page', async () => {
            await home.openFirstSearchResult();
        });
    });

    test('should display correct footer copyright text', async ({ home }) => {
        await test.step('Verify the footer displays the correct corporate copyright information', async () => {
            expect(await home.isFooterVisible()).toBeTruthy();

            const text = await home.getFooterCopyrightText();
            expect(text).toMatch(/by IMDb\.com, Inc\./);
        });
    });
});