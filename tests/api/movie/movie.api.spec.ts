import { test, expect } from '@fixtures/base';

/**
 * [Movie API Validation]
 *
 * PURPOSE:
 * Verify that the Movie API returns valid data for movie search operations.
 * This test demonstrates API testing capabilities within the Playwright framework.
 *
 * COVERAGE:
 * - Movie search functionality via API
 * - Response data validation
 * - Pagination support
 *
 * PRECONDITION:
 * API is accessible and responding (TMDB demo API or similar).
 *
 * CASES:
 * Automation_Script_2.1: Verify that API returns search results for a movie query.
 * *Expected*: The API returns a valid response with movie results array.
 *
 * Author: Mykhailiuk Vitaliy (Senior Automation QA)
 */

test.describe('Movie API - Search Validation', {
    tag: ['@api', '@smoke', '@P2'],
}, () => {
    //TODO: only for demo purposes has "skip" attr: should be replaced with more comprehensive API tests covering various endpoints and edge cases
    test.skip('should return search results for valid movie query', async ( { movieApi }) => {
        await test.step('Execute movie search via API', async () => {
            const response = await movieApi.searchMovies('Inception');
            
            await test.step('Verify API response structure', async () => {
                expect(response).toHaveProperty('results');
                expect(response.page).toBe(1);
            });

            await test.step('Verify search results contain expected movie', async () => {
                expect(response.results.length).toBeGreaterThan(0);
                const hasInception = response.results.some(
                    movie => movie.title.toLowerCase().includes('inception')
                );
                expect(hasInception).toBeTruthy();
            });
        });
    });
});
