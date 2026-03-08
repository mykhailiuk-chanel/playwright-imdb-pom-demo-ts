import { test } from '@fixtures/base';

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
        let movieName = '';

        await test.step('Step-1: Open first movie and verify movie details', async () => {
            const movieInfo = await topRatingModule.selectFirstMovieAndValidateDetails();
            movieName = movieInfo.name;
        });
        await test.step('Step-2: Verify movie name are correct', async () => {
            await topRatingModule.verifyMovieHeader(movieName);
        });
    });
});
