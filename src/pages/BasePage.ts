import { Page } from '@playwright/test';
import { Footer } from '../components/Footer';
import { Menu } from '../components/Menu';
import { MovieInfo } from '../components/MovieInfo';

/**
 * Base Page class that provides common functionality for all pages.
 * Exposes common components (footer, menu, movieInfo) for use in tests.
 */
export class BasePage {
    protected readonly page: Page;
    readonly footer: Footer;
    readonly menu: Menu;
    readonly movieInfo: MovieInfo;
    
    constructor(page: Page) {
        this.page = page;
        // Common components
        this.footer = new Footer(this.page);
        this.menu = new Menu(this.page);
        this.movieInfo = new MovieInfo(this.page);
    }

    /**
     * Navigates to the specified URL and waits for the page to be fully loaded.
     */
    async visitPage(url: string): Promise<void> {
        await this.page.goto(url, { waitUntil: 'networkidle' });
    }
}