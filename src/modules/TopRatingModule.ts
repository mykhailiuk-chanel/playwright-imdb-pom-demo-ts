import { TopRatingPage } from '@src/pages/TopRatingPage';

/**
 * Top Rating Module
 * 
 * Encapsulates business logic for Top 250 Movies workflows on IMDb.
 * This module orchestrates complex operations that span the list page and movie details page.
 * 
 * Responsibilities:
 * - Complete movie selection and validation workflows
 * - Cross-page data validation (list page vs detail page)
 * - Top 250 Movies specific business logic
 */
export class TopRatingModule {
    constructor(private readonly topRatingPage: TopRatingPage) {}

    /**
     * Performs a complete workflow to select and validate the first movie:
     * 1. Verifies the movie list has items
     * 2. Extracts movie information (name, year, rating) from the list
     * 3. Clicks the first movie
     * 4. Validates movie details on the detail page match the list data
     * 
     * @returns Promise<void>
     */
    async selectFirstMovieAndValidateDetails(): Promise<void> {
        await this.topRatingPage.verifyListHasItems();
        const { name, year, rating } = await this.topRatingPage.clickFirstMovie();
        
        await this.topRatingPage.movieInfo.verifyMovieHeader(name);
        await this.topRatingPage.movieInfo.verifyMovieYear(year);
        await this.topRatingPage.movieInfo.verifyRatingValue(rating);
    }

    /**
     * Verifies that the Top 250 Movies list is visible and contains movies.
     * 
     * @param minCount - Minimum number of movies expected (default: 1)
     * @returns Promise<boolean> - true if list has items
     */
    async verifyListIsPopulated(minCount: number = 1): Promise<boolean> {
        await this.topRatingPage.verifyListHasItems(minCount);
        return true;
    }

    /**
     * Gets the total count of movies in the Top 250 list.
     * Useful for validation without selecting a movie.
     * 
     * @returns Promise<number> - Number of movies in the list
     */
    async getMoviesCount(): Promise<number> {
        return await this.topRatingPage.getMoviesCount();
    }
}
