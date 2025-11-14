import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';
// import HeaderPage from "./HeaderPage"
// import ProductComponent from './ProductComponent'

export default class InventoryPage extends BasePage {
    private url = '/inventory.html';

    // private addToCartButton: string;

    private itemCards: Locator;

    // private productName: Locator;

    private sortDropdown: Locator;

    constructor(page: Page) {
        super(page);
        //  this.addToCartButton = "//button[text()='ADD TO CART']";
        this.itemCards = page.locator('.inventory_item');
        //  this.productName = page.locator('.inventory_item_name').first();
        this.sortDropdown = page.locator('.product_sort_container');
    }

    async navigate() {
        await super.navigate(this.url);
    }

    async assertOnInventoryPage() {
        await expect(this.page, 'User is expected to be on the inventory page').toHaveURL(
            /inventory/,
            { timeout: 10000 },
        );
    }
    //    async getName() {
    //         return root.locator('.inventory_item_name').textContent();
    //     }

    //     async addToCart() {
    //         await this.root.locator('button', { hasText: 'Add to cart' }).click();
    //     }

    async verifyNumberOfItems(expectCount: number): Promise<void> {
        await expect(this.itemCards).toHaveCount(expectCount);
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
