import { Page, Locator } from '@playwright/test';

/**
 * Footer Component
 * 
 * Represents the footer section of IMDb pages.
 * Exposes public locators for direct assertions in test files.
 */
export class Footer {
    protected readonly page: Page;
    readonly footerContainer: Locator;
    readonly copyright: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.footerContainer = this.page.locator('footer');
        this.copyright = this.page.locator('p.imdb-footer__copyright');
    }

    //=============================
    // METHODS
    //=============================
    /**
     * Verifies that the footer copyright is visible.
     */
    async isCopyrightVisible(): Promise<boolean> {
        return await this.copyright.isVisible();
    }
    /**
     * Gets the copyright text content.
     */
    async getCopyrightText(): Promise<string> {
        return await this.copyright.textContent() ?? '';
    }
}