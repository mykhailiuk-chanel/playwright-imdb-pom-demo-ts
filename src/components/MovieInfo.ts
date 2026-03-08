import { expect, Page, Locator } from '@playwright/test';

/**
 * MovieInfo Component
 * 
 * Represents movie information displayed on movie details pages.
 */
export class MovieInfo {
    protected readonly page: Page;
    readonly movieHeader: Locator;
    readonly movieRating: Locator;

    constructor(page: Page) {
        this.page = page;

        this.movieHeader = this.page.getByTestId('hero__primary-text');
        this.movieRating = this.page.getByTestId('hero-rating-bar__aggregate-rating__score').first();
    }

    /**
     * Returns the movie year element locator.
     */
    movieYear(year: string): Locator {
        return this.page.getByText(year).first();
    }    
    //=============================
    // METHODS
    //=============================
    /**
     * Verifies that the movie header is visible.
     */
    async verifyMovieHeader(_filmName: string): Promise<void> {
        await expect(this.movieHeader).toBeVisible();
    }

    /**
     * Verifies that the movie rating is visible
     * and optionally matches expected value.
     */
    async verifyRatingValue(expectedValue?: string): Promise<void> {
        if (expectedValue) {
            const movieRating = expectedValue + '/10';
            await expect(this.movieRating).toHaveText(movieRating);
        }
        else {
            await expect(this.movieRating).toBeVisible();
        }
    }

    /**
     * Verifies that the movie year is displayed.
     */
    async verifyMovieYear(expectedYear?: string): Promise<void> {
        if (expectedYear) {
            await expect(this.movieYear(expectedYear)).toHaveText(expectedYear);
        }
    }
}