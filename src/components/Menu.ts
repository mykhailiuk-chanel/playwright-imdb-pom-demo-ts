import { Page, Locator, expect } from '@playwright/test';

/**
 * Menu Component
 * 
 * Represents the navigation menu of IMDb pages.
 * Exposes public locators for direct assertions in test files.
 */
export class Menu {
    protected readonly page: Page;
    readonly menuButton: Locator;
    readonly menuPanel: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.menuButton = this.page.getByText('Menu', { exact: true });
        this.menuPanel = this.page.getByTestId('panel').first();
    }
    /**
     * Returns a menu item locator by name.
     * @param name - The text or regex to find the menu item
     */
    menuItem(name: string | RegExp): Locator {
        return this.menuPanel.getByText(name);
    }

    //=============================
    // METHODS
    //=============================
    /**
     * Verifies that the menu button is visible.
     */
    async verifyMenuVisible() {
        await expect(this.menuButton).toBeVisible();
    }
    /**
     * Opens the burger menu.
     */
    async openMenu() {
        await this.page.waitForTimeout(3000); // TODO:wait for animations to finish. Only for demo

        await this.menuButton.click();
        await expect(this.menuPanel).toBeVisible();
    }
    /**
     * Clicks a menu item by name.
     */
    async clickMenuItem(name: string | RegExp) {
        const item = this.menuItem(name);
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