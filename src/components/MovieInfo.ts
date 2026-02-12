import { Page, Locator } from '@playwright/test';

/**
 * MovieInfo Component
 * 
 * Represents movie information displayed on movie details pages.
 * Exposes public locators for direct assertions in test files.
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
     * Verifies that the movie details header matches the expected movie name.
     * TODO: exclude filmName from the function arg as we check only state for now
     */
    async verifyMovieHeader(filmName: string) {
        await this.movieHeader.waitFor({ state: 'visible' });
    }

    /**
     * Verifies that the movie rating is visible and matches expected value.
     */
    async verifyRatingValue(expectedValue?: string) {
        if (expectedValue) {
            await this.movieRating.waitFor({ state: 'visible' });
        }
    }

    /**
     * Verifies that the movie year is displayed.
     */
    async verifyMovieYear(expectedYear?: string) {
        if (expectedYear) {
            await this.movieYear(expectedYear).waitFor({ state: 'visible' });
        }
    }
}