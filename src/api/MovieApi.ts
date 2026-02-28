import { BaseApi } from '@src/api/BaseApi';

export interface MovieSearchResponse {
    results: MovieSummary[];
    total_results: number;
    page: number;
}

export interface MovieSummary {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    poster_path: string | null;
}

export interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    runtime: number;
    genres: { id: number; name: string }[];
    vote_average: number;
    vote_count: number;
    status: string;
}

/**
 * Movie API client providing methods for movie-related endpoints.
 * 
 * Extends BaseApi to inherit shared configuration (baseUrl, apiKey).
 * 
 * Responsibilities:
 * - Search movies by query
 * - Get movie details by ID
 * - Retrieve movie lists (popular, top-rated, etc.)
 */
export class MovieApi extends BaseApi {
    //=============================
    // MOVIE ENDPOINTS
    //=============================
    /**
     * Searches for movies by query string.
     * 
     * @param query - The search term (movie title)
     * @param page - Page number for pagination (default: 1)
     * @returns Promise<MovieSearchResponse> - Search results with pagination info
     */
    async searchMovies(query: string, page = 1): Promise<MovieSearchResponse> {
        const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&page=${page}`;
        return this.get<MovieSearchResponse>(url);
    }

    /**
     * Retrieves detailed information about a specific movie.
     * 
     * @param movieId - The unique identifier of the movie
     * @returns Promise<MovieDetails> - Full movie details including runtime, genres, etc.
     */
    async getMovieDetails(movieId: number): Promise<MovieDetails> {
        const url = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`;
        return this.get<MovieDetails>(url);
    }
    //=============================
    // EXAMPLE: POST REQUEST (TODO)
    //=============================

}
