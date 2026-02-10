import { Page, Locator } from '@playwright/test';

export class Footer {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //=============================
    // LOCATORS
    //=============================
    private get copyright(): Locator {
        // Root/footer content – demo selector
        return this.page.locator('p.imdb-footer__copyright');
    }
    /**
     * Verifies that the footer copyright is visible and contains the expected text.
     */
    async isCopyrightVisible(): Promise<boolean> {
        return await this.copyright.isVisible();
    }

    async getCopyrightText(): Promise<string> {
        return await this.copyright.textContent() ?? '';
    }
}