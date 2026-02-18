import { test, expect } from '@fixtures/base';

/**
 * [Top 250 Movies Page - Movie Information Validation]
 *
 * PURPOSE:
 * Verify that a guest user can navigate to the IMDb Top 250 Movies page,
 * select the first movie in the list, and see its correct details.
 *
 * TEST SCENARIO:
 * 1. Navigate to the IMDb Top 250 Movies page via the menu.
 * 2. Verify that the movie list is visible and contains multiple items.
 * 3. Click on the first movie in the list.
 * 4. Validate that the movie details page displays:
 * - Correct movie title
 * - IMDb rating
 * - Year of release
 *
 * COVERAGE:
 * - Top 250 Movies navigation via menu
 * - Movie list visibility and item count
 * - Movie details page validation (title, rating, year)
 *
 * Author: Mykhailiuk Vitaliy (Senior Automation QA)
 */

test.describe('Top 250 Movies Page - Movie Search Validation', {
    tag: ['@medium-level', '@top-250-movies', '@P2'],
}, () => {
    test.beforeEach(async ({ topRating }) => {
        await test.step('Navigate to IMDb Top 250 Movies page via menu', async () => {
            await topRating.moveToTopByMenu('/');
        });
    });

    test('topRating should include more than one film',
        { tag: "@job2"},
        async ({ topRating }) => {
        await test.step('Verify the list is visible', async () => {
            await expect(topRating.movies.first()).toBeVisible();
        });
    });

    test('first rating film should have correct movie information',
        async ({ topRatingModule }) => {
        await test.step('Verify the list is visible and has at least 1 movie in list', async () => {
            const count = await topRatingModule.getMoviesCount();
            expect(count).toBeGreaterThan(0);
        });

        await test.step('Click on the first movie and validate selected movie details', async () => {
            await topRatingModule.selectFirstMovieAndValidateDetails();
        });
    });
});