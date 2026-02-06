import { expect, Page } from '@playwright/test';

export class Menu {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Returns the burger menu element.
     */
    private get menuButton() {
        return this.page.getByText('Menu', { exact: true });
    }
    /**
     * Returns the  menu item element.
     */
    private menuItem(name: string | RegExp) {
        return this.page.getByText(name);
    }
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
        await this.verifyMenuVisible();
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