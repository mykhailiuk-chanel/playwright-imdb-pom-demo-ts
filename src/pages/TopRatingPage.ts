import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { SITE } from '../../test-data/site';


export class TopRatingPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    //=============================
    // TOP RATING PAGE LOCATORS
    //=============================
    /**
     * Returns all movie items in the list.
     */
    private get movies(): Locator {
        return this.page.getByRole('listitem');
    }

    private get firstMovieName(): Locator {
        return this.page.getByRole('heading', { level: 3 }).first();
    }

    private get firstMovieYear(): Locator {
        return this.page.locator('.cli-title-metadata-item').first();
    }

    private get firstMovieRate(): Locator {
        return this.page.getByTestId('ratingGroup--container').first();
    }
    //=============================
    // HOME PAGE METHODS
    //=============================
    async moveToTopByMenu(path = '/') {
        await this.visitPage(path);
        await this.menu.openMenuAndSelectItem(SITE.menuRatingItem);
    }
    /**
     * Verifies the list is visible and has more than one item.
     */
    async verifyListHasItems(minCount: number = 1) {
        const count = await this.movies.count();
        expect(count).toBeGreaterThan(minCount);
    }
    /**
     * Clicks a movie by index (0-based).
     */
    async clickMovieByIndex(): Promise<{ name: string, year: string, rating: string }> {
        await expect(this.firstMovieName).toBeVisible();
        const name = await this.firstMovieName.innerText();
        const year = await this.firstMovieYear.innerText();
        const rating = (await this.firstMovieRate.innerText()).slice(0, 3);
        console.log(`Movie found: ${name} (${year}) - Rating: ${rating}`); // Debug log
        await this.firstMovieName.click();
        
        return { name, year, rating };
    }
    /**
     * Clicks first movie and verifies its info
     */
    async clickFirstMovieAndVerify() {
        await this.verifyListHasItems();
        const { name, year, rating } = await this.clickMovieByIndex();

        await this.movieInfo.verifyMovieHeader(name);
        await this.movieInfo.verifyMovieYear(year);
        await this.movieInfo.verifyRatingValue(rating);
    }
}