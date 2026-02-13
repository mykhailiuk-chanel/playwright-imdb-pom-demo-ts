import { HomePage } from '@src/pages/HomePage';

/**
 * Search Module
 * 
 * Encapsulates business logic for search workflows on IMDb.
 * This module orchestrates complex search operations that span multiple pages/components.
 * 
 * Responsibilities:
 * - Complex search workflows (multi-step operations)
 * - Search result validation
 * - Decision-making based on search state
 */
export class SearchModule {
    constructor(private readonly homePage: HomePage) {}

    /**
     * Performs a complete search workflow:
     * 1. Fills the search field with the movie name
     * 2. Opens the first search result
     * 3. Verifies the movie header is displayed on the details page
     * 
     * @param filmName - The name of the movie to search for
     */
    async searchAndOpenFilm(filmName: string): Promise<void> {
        await this.homePage.searchForFilm(filmName);
        await this.homePage.openFirstSearchResult();
        await this.homePage.movieInfo.verifyMovieHeader(filmName);
    }

    /**
     * Performs a search and returns the number of results found.
     * Useful for validating search functionality without opening results.
     */
    async searchAndGetResultsCount(filmName: string): Promise<number> {
        await this.homePage.searchForFilm(filmName);
        return this.homePage.searchResultsList.count();
    }
    /**
     * Checks if search results are displayed.
     */
    async hasSearchResults(): Promise<boolean> {
        const count = await this.homePage.searchResultsList.count();
        return count > 0;
    }
}
