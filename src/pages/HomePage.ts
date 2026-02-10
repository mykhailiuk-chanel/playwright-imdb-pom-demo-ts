import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    //=============================
    // HOME PAGE LOCATORS
    //=============================
    private get searchField() {
        return this.page.getByTestId('suggestion-search');
    }

    private get moviesList() {
        return this.page.getByTestId('search-result--const').first();
    }
    //=============================
    // HOME PAGE METHODS
    //=============================
    async goto(path = '/') {
        await this.visitPage(path);
    }

    async getPageTitle(): Promise<string> {
        return this.page.title();
    }

    async isSearchFieldVisible(): Promise<boolean> {
        return await this.searchField.isVisible();
    }

    async isSearchResultsVisible(): Promise<boolean> {
        return await this.moviesList.isVisible();
    }
    // -------- Actions --------
    /**
     * Fills the movie search field with the provided movie name.
     */
    async fillSearchField(filmName: string) {
        await this.searchField.fill(filmName);
    }
    /**
     * Searches for a movie and opens its details page.
     */
    async searchForFilm(name: string) {
        await this.fillSearchField(name);
    }
    /**
     * Opens the first movie from the search results list.
     */
    async openFirstSearchResult() {
        await this.moviesList.click();
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
    /**
     * Verifies that the footer has correct text.
     */
    async getFooterCopyrightText(): Promise<string> {
        return await this.footer.getCopyrightText();
    }
    /**
     * Verifies that the footer is visible on the Home page.
     */
    async isFooterVisible(): Promise<boolean> {
        return await this.footer.isCopyrightVisible();
    }
}