import { test } from '@fixtures/base';

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
    test.beforeEach('Navigate to IMDb Top 250 Movies page via menu', async ({ topRating }) => {
        await topRating.moveToTopByMenu('/');
    });

    test('First movie in Top 250 should be visible',
        { tag: "@job2"},
        async ({ topRating }) => {
            await topRating.verifyFirstMovieIsVisible();
        }
    );

    test('first rating film should have correct movie information', async ({ topRatingModule }) => {
        let moviewName = '';

        await test.step('Step-1: Open first movie and verify movie details', async () => {
            const moveInfo = await topRatingModule.selectFirstMovieAndValidateDetails();
            moviewName = moveInfo.name;
        });
        await test.step('Step-2: Verify movie name are correct', async () => {
            await topRatingModule.verifyMovieHeader(moviewName);
        });
    });
});

// Arrange/Act/Assert - "Assert" can be in a test or in POM methods.