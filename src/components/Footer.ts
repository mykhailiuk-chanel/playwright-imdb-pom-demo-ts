import { expect, Page } from '@playwright/test';

export class Footer {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Returns the footer copyright element.
     */
    private get copyright() {
        // Root/footer content – demo selector
        return this.page.locator('p.imdb-footer__copyright');
    }
    /**
     * Verifies that the footer copyright is visible and contains the expected text.
     */
    async verifyCopyright() {
        await expect(this.copyright).toBeVisible();
        await expect(this.copyright).toContainText(/ by IMDb\.com, Inc\./);
    }
}