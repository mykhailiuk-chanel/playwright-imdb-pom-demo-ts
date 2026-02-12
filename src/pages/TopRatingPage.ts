import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { SITE } from '../../test-data/site';

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
    readonly firstMovieName: Locator;
    readonly firstMovieYear: Locator;
    readonly firstMovieRate: Locator;

    constructor(page: Page) {
        super(page);        

        this.movies = this.page.getByRole('listitem');
        this.firstMovieName = this.page.getByRole('heading', { level: 3 }).first();
        this.firstMovieYear = this.page.locator('.cli-title-metadata-item').first();
        this.firstMovieRate = this.page.getByTestId('ratingGroup--container').first();
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
        const rating = (await this.firstMovieRate.innerText()).slice(0, 3);

        return { name, year, rating };
    }    
    /**
     * Clicks the first movie in the list.
     */
    async clickFirstMovie(): Promise<{ name: string, year: string, rating: string }> {
        const { name, year, rating } = await this.extractMovieInfo();
        console.log(`Movie found: ${name} (${year}) - Rating: ${rating}`); // Debug log
        
        await this.firstMovieName.click();
        
        return { name, year, rating };
    }
    /**
     * Verifies the list is visible and has more than one item.
     */
    async verifyListHasItems(minCount: number = 1) {
        const count = await this.movies.count();
        if (count <= minCount) {
            throw new Error(`Expected more than ${minCount} movies, but found ${count}`);
        }
    }
    /**
     * Clicks first movie and verifies its info.
     */
    async clickFirstMovieAndVerify() {
        await this.verifyListHasItems();
        const { name, year, rating } = await this.clickFirstMovie();

        await this.movieInfo.verifyMovieHeader(name);
        await this.movieInfo.verifyMovieYear(year);
        await this.movieInfo.verifyRatingValue(rating);
    }
}