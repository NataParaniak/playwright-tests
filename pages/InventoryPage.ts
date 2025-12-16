import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';

export default class InventoryPage extends BasePage {
    readonly url = '/inventory.html';

    readonly itemCards: Locator;

    readonly sortDropdown: Locator;

    readonly itemPrice: Locator;

    constructor(page: Page) {
        super(page);
        this.itemCards = page.locator('.inventory_item');
        this.sortDropdown = page.locator('.product_sort_container');
        this.itemPrice = page.locator('.inventory_item_price');
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

    //      async addToCart(productName: string): Promise<void> {
    //     const card = this.page.locator(`.inventory_item:has-text("${productName}")`);
    //     await card.locator('button').click();
    //   }

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

    async verifySortingLowToHighFromDropDown() {
        const priceListOfItem = this.itemPrice;
        const count = await priceListOfItem.count();
        const prices: number[] = [];

        for (let i = 0; i < count; i += 1) {
            const text = await priceListOfItem.nth(i).innerText();
            prices.push(Number(text.replace('$', '')));
        }
        const sorted = [...prices].sort((a, b) => a - b);

        expect(prices).toEqual(sorted);
    }

    async verifySortingHighToLowFromDropDown() {
        const priceListOfItem = this.itemPrice;
        const count = await priceListOfItem.count();
        const prices: number[] = [];

        for (let i = 0; i < count; i += 1) {
            const text = await priceListOfItem.nth(i).innerText();
            prices.push(Number(text.replace('$', '')));
        }
        const sorted = [...prices].sort((a, b) => b - a);

        expect(prices).toEqual(sorted);
    }
}
