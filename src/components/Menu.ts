import { Page, Locator } from '@playwright/test';

/**
 * Menu Component
 * 
 * Represents the navigation menu of IMDb pages.
 * Exposes public locators for direct assertions in test files.
 */
export class Menu {
    protected readonly page: Page;
    readonly menuButton: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.menuButton = this.page.getByText('Menu', { exact: true });
    }

    /**
     * Returns a menu item locator by name.
     * @param name - The text or regex to find the menu item
     */
    menuItem(name: string | RegExp): Locator {
        return this.page.getByText(name);
    }

    //=============================
    // METHODS
    //=============================
    /**
     * Verifies that the menu button is visible.
     */
    async verifyMenuVisible() {
        await this.menuButton.waitFor({ state: 'visible' });
    }
    /**
     * Opens the burger menu.
     */
    async openMenu() {
        await this.menuButton.click();
    }
    /**
     * Clicks a menu item by name.
     */
    async clickMenuItem(name: string | RegExp) {
        const item = this.menuItem(name);
        await item.waitFor({ state: 'visible', timeout: 5000 });
        await item.click();
    }
    /**
     * Opens the menu and selects a menu item by name.
     */
    async openMenuAndSelectItem(name: string | RegExp) {
        await this.openMenu();
        await this.clickMenuItem(name);
    }
}