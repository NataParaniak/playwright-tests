import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';

export default class InventoryPage extends BasePage {
    readonly url = '/inventory.html';

    readonly itemCards: Locator;

    readonly sortDropdown: Locator;

    constructor(page: Page) {
        super(page);
        this.itemCards = page.locator('.inventory_item');
        this.sortDropdown = page.locator('.product_sort_container');
    }

    async navigate() {
        await super.navigate(this.url);
    }

    async assertOnInventoryPage() {
        await expect(this.page, 'User is expected to be on the inventory page').toHaveURL(
            /.*inventory\.html/,
            { timeout: 7000 },
        );
    }

    async addToCart(productName: string) {
        const button = this.page.locator(`.inventory_item:has-text("${productName}") button`);
        await button.click();
    }

    async selectSorting() {
        await this.sortDropdown.selectOption('lohi');
    }
}
