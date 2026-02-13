import { Page, Locator } from '@playwright/test';
import { BasePage } from '@src/pages/BasePage';

/**
 * Home Page Object Model
 * 
 * This class represents the IMDb Home page and provides:
 * - Public locators for direct assertions in tests
 * - Action methods for user interactions
 * - Navigation methods
 * 
 * Note: Footer functionality is available via this.footer (inherited from BasePage)
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
    /**
     * Gets the current page title.
     */
    async getPageTitle(): Promise<string> {
        return this.page.title();
    }

    //=============================
    // HOME PAGE ACTIONS
    //=============================
    /**
     * Fills the movie search field with the provided movie name.
     */
    async fillSearchField(filmName: string) {
        await this.searchField.fill(filmName);
    }    
    /**
     * Searches for a movie (fills search field).
     */
    async searchForFilm(name: string) {
        await this.fillSearchField(name);
    }    
    /**
     * Opens the first movie from the search results list.
     */
    async openFirstSearchResult() {
        await this.firstSearchResult.click();
    }    
    /**
     * Searches for a movie and opens its details page.
     */
    async searchAndOpenFilm(name: string) {
        await this.searchForFilm(name);
        await this.openFirstSearchResult();
        // keep this for now as requested
        await this.movieInfo.verifyMovieHeader(name);
    }
}