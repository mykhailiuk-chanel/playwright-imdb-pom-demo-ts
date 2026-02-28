import { APIRequestContext, expect } from '@playwright/test';

/**
 * Base API class that provides common methods for API testing.
 * 
 * It encapsulates common functionality like request execution and response validation.
 * 
 * Responsibilities:
 * - Execute GET/POST requests
 * - Hold shared API configuration (base URL, API key)
 * 
 * NOTE: API_BASE_URL must be defined in .env file.
 * Validation happens in global-setup.ts before tests start.
 */
export class BaseApi {
    //=============================
    // SHARED API CONFIGURATION
    //=============================
    // API_BASE_URL is validated in global-setup.ts before tests run
    protected readonly baseUrl = process.env.API_BASE_URL;
    protected readonly apiKey = process.env.API_KEY;

    constructor(protected readonly request: APIRequestContext) {}

    /**
     * Executes an GET request to the specified URL.
     * 
     * @param url - The endpoint URL to request
     * @returns Parsed JSON response
     */
    protected async get<T>(url: string): Promise<T> {
        const response = await this.request.get(url);
        expect(response.ok()).toBeTruthy();
        return response.json() as Promise<T>;
    }

    /**
     * Executes an POST request to the specified URL.
     * 
     * @param url - The endpoint URL to request
     * @param data - Optional request body to send (will be JSON stringified)
     * @returns Parsed JSON response of type T
     */
    protected async post<T>(url: string, data?: unknown): Promise<T> {
        const response = await this.request.post(url, { data });
        expect(response.ok()).toBeTruthy();
        return response.json() as Promise<T>;
    }

    //=============================
    // FUTURE EXTENSIONS (TODO)
    //=============================
    // protected async put<T>(url: string, data?: unknown): Promise<T>
    // protected async delete(url: string): Promise<void>
    // protected async patch<T>(url: string, data?: unknown): Promise<T>
    // protected async setHeader(key: string, value: string): void
    // protected async setAuthToken(token: string): void
}
