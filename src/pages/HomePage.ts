import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { SITE } from '../../test-data/site';

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

    /**
     * Verifies that the Home page browser title matches the expected value.
     */
    async verifyPageTitle() {
        await expect(this.page).toHaveTitle(SITE.title);
    }
    /**
     * Verifies that the movie search input field is visible to the user.
     */
    async verifySearchFieldVisible() {
        await expect(this.searchField).toBeVisible();
    }
    /**
     * Verifies that the movie search results list is displayed.
     */
    async verifySearchResultsVisible() {
        await expect(this.moviesList).toBeVisible();
    }
    /**
     * Fills the movie search field with the provided movie name.
     */
    async fillSearchField(filmName: string) {
        await this.verifySearchFieldVisible();
        await this.searchField.fill(filmName);
    }
    /**
     * Searches for a movie and opens its details page.
     */
    async searchForFilm(name: string) {
        await this.fillSearchField(name);
        await this.verifySearchResultsVisible();
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
        await this.movieInfo.verifyMovieHeader(name);
    }
    /**
     * Verifies that the footer is displayed correctly on the Home page.
     */
    async verifyFooter() {
        await this.footer.verifyCopyright();
    }
}