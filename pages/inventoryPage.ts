import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';

export default class InventoryPage extends BasePage {
    private url = '/inventory.html';

    private addToCartButton: string;

    private itemCards: Locator;

    private nameProduct: Locator;

    private sortDropdown: Locator;

    private firstButtonAddToCart: Locator;

    constructor(page: Page) {
        super(page);

        this.addToCartButton = "//button[text()='ADD TO CART']";
        this.itemCards = page.locator('.inventory_item');
        this.nameProduct = page.locator('.inventory_item_name').first();
        this.firstButtonAddToCart = page
            .locator('.inventory_item button', { hasText: 'Add to cart' })
            .first();
        this.sortDropdown = page.locator('.product_sort_container');
    }

    async navigate() {
        await super.navigate(this.url);
    }

    async assertOnInventoryPage() {
        await expect(this.page, 'User is expected to be on the inventory page').toHaveURL(
            /inventory/,
        );
    }

    async clickAddButtonFirst(): Promise<void> {
        await this.firstButtonAddToCart.click();
    }

    async verifyNumberOfItems(expectCount: number): Promise<void> {
        await expect(this.itemCards).toHaveCount(expectCount);
    }

    async takeScreenshot(filename = 'inventory.png'): Promise<void> {
        await this.page.screenshot({ path: filename });
    }

    async nameProductClickable(): Promise<void> {
        const nameProductVariable = this.page.locator('.inventory_item_name').first();
        await nameProductVariable.waitFor({ state: 'visible' });
        await nameProductVariable.click();
    }

    async selectSorting() {
        await this.sortDropdown.selectOption('lohi');
    }
}
