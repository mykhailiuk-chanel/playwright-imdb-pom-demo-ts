import { TopRatingPage } from '@src/pages/TopRatingPage';

// Movie DTO type:
type MovieInfo = {
  name: string
  year: string
  rating: string
}

/**
 * Top Rating Module
 * 
 * Encapsulates business logic for Top 250 Movies workflows on IMDb.
 */
export class TopRatingModule {
    constructor(private readonly topRatingPage: TopRatingPage) {}

    /**
     * Performs the full workflow:
     * 1. Ensure movie list is populated
     * 2. Capture movie data from list
     * 3. Open first movie
     * 4. Validate movie details page
     */
    async selectFirstMovieAndValidateDetails(): Promise<MovieInfo> {
        await this.topRatingPage.verifyFirstMovieIsVisible();

        const { name, year, rating } = await this.topRatingPage.clickFirstMovie();

        await this.verifyMovieDetails({ name, year, rating });

        return { name, year, rating };
    }

    /**
     * Validates movie details against expected values.
     */
    async verifyMovieDetails(movie: MovieInfo): Promise<void> {
        const { name, year, rating } = movie;

        await this.topRatingPage.movieInfo.verifyMovieHeader(name);
        await this.topRatingPage.movieInfo.verifyMovieYear(year);
        await this.topRatingPage.movieInfo.verifyRatingValue(rating);
    }

        /**
     * Validates movie details against expected values.
     */
    async verifyMovieHeader(name: string): Promise<void> {
        await this.topRatingPage.movieInfo.verifyMovieHeader(name);
    }
}
