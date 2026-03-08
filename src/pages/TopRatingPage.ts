import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from '@src/pages/BasePage';
import { SITE } from '@test-data/site';

// Movie DTO type:
type MovieInfo = {
  name: string
  year: string
  rating: string
}

/**
 * Top Rating Page Object Model
 * 
 * This class represents the IMDb Top 250 Movies page and provides:
 * - Public locators for direct assertions in tests
 * - Action methods for user interactions
 * - Navigation methods
 */
export class TopRatingPage extends BasePage {
    readonly movies: Locator;
    readonly firstMovie: Locator;
    readonly firstMovieName: Locator;
    readonly firstMovieYear: Locator;
    readonly firstMovieRating: Locator;

    constructor(page: Page) {
        super(page);        

        this.movies = this.page.getByRole('listitem');

        this.firstMovie = this.movies.first()
        this.firstMovieName = this.page.getByRole('heading', { level: 3 }).first();
        this.firstMovieYear = this.page.locator('.cli-title-metadata-item').first();
        this.firstMovieRating = this.page.getByTestId('ratingGroup--container').first();
    }
    
    //=============================
    // TOP RATING PAGE METHODS
    //=============================
    /**
     * Navigates to Top 250 Movies page via menu.
     */
    async moveToTopByMenu(path = '/') {
        await this.visitPage(path);
        await this.menu.openMenuAndSelectItem(SITE.menuRatingItem);
    }    
    /**
     * Gets the count of movies in the list.
     */
    async getMoviesCount(): Promise<number> {
        return await this.movies.count();
    }
    /**
     * Extracts information from the first movie in the list.
     */
    async extractMovieInfo(): Promise<{ name: string, year: string, rating: string }> {
        const name = await this.firstMovieName.innerText();
        const year = await this.firstMovieYear.innerText();
        const rating = (await this.firstMovieRating.innerText()).slice(0, 3);

        return { name, year, rating };
    }    
    /**
     * Clicks the first movie in the list.
     */
    async clickFirstMovie(): Promise<MovieInfo> {
        const movieInfo = await this.extractMovieInfo();
        console.log(`Movie found: ${movieInfo.name} (${movieInfo.year}) - Rating: ${movieInfo.rating}`); // Debug log
        
        await this.firstMovieName.click();
        
        return movieInfo;
    }
    /**
     * Verifies the list contains at least the specified number of items.
     */
    async verifyListHasItems(minCount: number = 1) {
        const count = await this.movies.count();
        expect(count).toBeGreaterThanOrEqual(minCount);
    }
    /**
     * Verifies the first topRating movie is visible.
     */
    async verifyFirstMovieIsVisible() {
        await expect(this.firstMovie).toBeVisible();
    }
}