import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from '@src/pages/BasePage';

/**
 * Home Page Object Model
 * 
 * This class represents the IMDb Home page and provides UI abstraction only:
 * - Public locators for direct assertions in tests
 * - Action methods for user interactions (click, fill, getText)
 * - Navigation methods
 */

export class HomePage extends BasePage {
    readonly searchField: Locator;
    readonly firstSearchResult: Locator;
    readonly searchResultsList: Locator;

    constructor(page: Page) {
        super(page);

        this.searchField = this.page.getByTestId('suggestion-search');
        this.firstSearchResult = this.page.getByTestId('search-result--const').first();
        this.searchResultsList = this.page.getByTestId('search-result--const');
    }
    
    //=============================
    // HOME PAGE METHODS
    //=============================
    async goto(path = '/') {
        await this.visitPage(path);
    }

    //=============================
    // HOME PAGE ACTIONS
    //=============================
    /**
     * Fills the movie search field with the provided movie name.
     */
    async searchForFilm(filmName: string) {
        await this.searchField.fill("");
        await this.searchField.waitFor({ state: 'attached' });
        await this.searchField.fill(filmName);
        await this.searchField.press("Enter");
    }    
    /**
     * Opens the first movie from the search results list.
     */
    async openFirstSearchResult(filmName: string) {
        const movie = this.page.getByRole('heading', { name: filmName, level: 3 }).first();
        await expect(movie).toBeVisible({timeout: 10000}); // Wait for search results to load
        await movie.click();
    }
}