import { Page } from '@playwright/test';
import { Footer } from '../components/Footer';
import { Menu } from '../components/Menu';
import { MovieInfo } from '../components/MovieInfo';

export class BasePage {
    protected readonly page: Page;
    protected footer: Footer;
    protected menu: Menu;
    protected movieInfo: MovieInfo;
    
    constructor(page: Page) {
        this.page = page;
        // Common components
        this.footer = new Footer(this.page);
        this.menu = new Menu(this.page);
        this.movieInfo = new MovieInfo(this.page);
    }

    async visitPage(url: string) {
        // Wait until network is idle and page is ready
        await this.page.goto(url, { waitUntil: 'networkidle' });
    }
}