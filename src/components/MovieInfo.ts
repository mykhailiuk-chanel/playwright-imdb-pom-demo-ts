import { expect, Page } from '@playwright/test';

export class MovieInfo {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    /**
     * Returns the movie header element.
     */
    private get movieHeader() {
        return this.page.getByTestId('hero__primary-text');
    }
    /**
     * Returns the movie rating element.
     */
    private get movieRating() {
        return this.page.getByTestId('hero-rating-bar__aggregate-rating__score').first();
    }

    /**
     * Returns the movie year element. Uses first span in metadata container
     */
    private movieYear(year: string) {
        return this.page.getByText(year).first();
    }
    //=============================
    // VERIFICATIONS
    //=============================
    /**
     * Verifies that the movie details header matches the expected movie name.
     */
    async verifyMovieHeader(filmName: string) {
        await expect(this.movieHeader).toHaveText(filmName);
    }

    async verifyRatingValue(expectedValue?: string) {
        await expect(this.movieRating).toBeVisible();
        if (expectedValue) {
            await expect(this.movieRating).toContainText(expectedValue);
        }
    }

    async verifyMovieYear(expectedYear?: string) {
        if (expectedYear) {
            await expect(this.movieYear(expectedYear)).toHaveText(expectedYear);
        }
    }
}