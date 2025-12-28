import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';

export default class InventoryPage extends BasePage {
    readonly url = '/inventory.html';

    readonly itemCards: Locator;

    readonly sortDropdown: Locator;

    readonly itemPrice: Locator;

    readonly inventoryItems: Locator;

    readonly inventoryItemName: Locator;

    constructor(page: Page) {
        super(page);
        this.itemCards = page.locator('.inventory_item');
        this.sortDropdown = page.locator('.product_sort_container');
        this.itemPrice = page.locator('.inventory_item_price');
        this.inventoryItems = page.locator('.inventory_item');
        this.inventoryItemName = page.locator('.inventory_item_name');
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

    getProductCardLocator(productName: string): Locator {
        return this.inventoryItems.filter({
            has: this.inventoryItemName.filter({ hasText: productName }),
        });
    }

    async getProductsCount(): Promise<number> {
        return this.inventoryItems.count();
    }

    async assertProductsCount(expected: number): Promise<void> {
        const actual = await this.getProductsCount();
        expect(actual, `Expected ${expected} products, but got ${actual}`).toBe(expected);
    }

    async addToCart(productName: string) {
        const button = this.page.locator(`.inventory_item:has-text("${productName}") button`);
        await button.click();
    }

    async selectLowToHighFromDropDown() {
        await this.sortDropdown.selectOption('lohi');
    }

    async selectHighToLowFromDropDown() {
        await this.sortDropdown.selectOption('hilo');
    }

    async getAllPrices(): Promise<number[]> {
        const count = await this.itemPrice.count();
        const prices: number[] = [];

        for (let i = 0; i < count; i++) {
            const text = await this.itemPrice.nth(i).innerText();
            prices.push(Number(text.replace('$', '')));
        }

        return prices;
    }
}
