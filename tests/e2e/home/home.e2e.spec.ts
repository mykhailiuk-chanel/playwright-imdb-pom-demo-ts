import { test, expect } from '@fixtures/base';
import { Films } from '@test-data/Films';
import { SiteBuilder } from '@test-data/builders';

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
 * (Parameterized test)
 *
 * Author: Mykhailiuk Vitaliy (Senior Automation QA)
 */

test.describe('Home Page - Movie Search Validation', {
    tag: ['@smoke', '@high-level', '@home', '@P1'],
}, () => {
    // Use SiteBuilder to get site configuration
    const siteConfig = new SiteBuilder().build();

    test.beforeEach(async ({ home }) => {
        await test.step('Navigate to IMDb Home page', async () => {
            await home.goto();
        });
    });

    test('should display correct browser title: "IMDb: Ratings, Reviews, and Where to Watch..."',
        { tag: "@job1"},
        async ({ page }) => {
            // `await expect.soft` - because if title is wrong - it can be not critical for some cases, 
            // but we want to log it and continue test execution. It allows us to identify issues without failing the entire test immediately.
            await expect.soft(page).toHaveTitle(siteConfig.title); // Using title from SiteBuilder configuration
        }
    );
    // Parameterized test that dynamically uses movie titles
    Films.forEach((film) => {
        test(`should complete full search workflow for "${film.title}"`, 
            { tag: "@search" },
            async ({ searchModule }) => {            
                await searchModule.searchAndOpenFilm(film.title);
            }
        );
    });
});

// Arrange/Act/Assert - "Assert" can be in a test or in POM methods.