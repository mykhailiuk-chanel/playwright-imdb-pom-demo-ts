import { test, expect } from '@fixtures/base';
import { FILMS } from '@test-data/films';
import { SITE } from '@test-data/site';

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
 * - Footer visibility and content validation
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
    tag: ['@smoke', '@high-level', '@home', '@search', '@P1'],
}, () => {
    test.beforeEach(async ({ home }) => {
        await test.step('Navigate to IMDb Home page', async () => {
            await home.goto();
        });
    });

    test('should display correct browser title', async ({ page }) => {
        await test.step('Verify browser title displays "IMDb: Ratings, Reviews, and Where to Watch..."', async () => {
            await expect(page).toHaveTitle(SITE.title);
        });
    });

    test('should complete full search moview workflow by name', async ({ searchModule }) => {
        await test.step('Execute complete search workflow', async () => {
            await searchModule.searchAndOpenFilm(FILMS.wolf.title);
        });
    });

    test('should display correct footer copyright text', async ({ home }) => {
        await test.step('Verify the footer displays the correct corporate copyright information', async () => {
            await expect(home.footer.footerContainer).toBeVisible();
            await expect(home.footer.copyright).toContainText('by IMDb.com, Inc.');
        });
    });
});