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
    constructor(page: Page) {
        super(page);
    }
    //=============================
    // HOME PAGE LOCATORS
    //=============================
    readonly searchField: Locator = this.page.getByTestId('suggestion-search');
    readonly firstSearchResult: Locator = this.page.getByTestId('search-result--const').first();
    readonly searchResultsList: Locator = this.page.getByTestId('search-result--const');
    
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
        await this.searchField.waitFor({ state: 'attached' });
        await this.searchField.fill("");
        await this.searchField.fill(filmName);
    }    
    /**
     * Opens the first movie from the search results list.
     */
    async openFirstSearchResult() {
        await expect(this.firstSearchResult).toBeVisible({timeout: 10000}); // Wait for search results to load
        await this.firstSearchResult.click();
    }
}