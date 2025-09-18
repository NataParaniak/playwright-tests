import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';

export default class InventoryPage extends BasePage {
    private url = '/inventory.html';

    private pagebutton: string;

    private logOutButton: string;

    private addToCartButton: string;

    private itemCards: Locator;

    private firstButtonAddToCart: Locator;

    private sortDropdown: Locator;

    private itemPrices: Locator;

    constructor(page: Page) {
        super(page);
        this.pagebutton = "//button[text()='Open Menu']";
        this.logOutButton = "//*[@id='logout_sidebar_link']";
        this.addToCartButton = "//button[text()='ADD TO CART']";
        this.itemCards = page.locator('.inventory_item');
        this.firstButtonAddToCart = page.locator('[data-test^="add-to-cart"]').first();
        this.sortDropdown = page.locator('.product_sort_container');
        this.itemPrices = page.locator('.inventory_item_price');
    }

    async navigate() {
        await super.navigate(this.url);
    }

    async assertOnInventoryPage() {
        await expect(this.page, 'User is expected to be on the inventory page').toHaveURL(
            /inventory/,
        );
    }

    async logOut(): Promise<void> {
        await this.page.click(this.pagebutton);
        await this.page.click(this.logOutButton);
    }

    async clickAddButtonFirst(): Promise<void> {
        await this.firstButtonAddToCart.click();
    }

    async verifyNumberOfItems(expectCount: number): Promise<void> {
        await expect(
            this.itemCards,
            `Expected ${expectCount} items, but found a different number`,
        ).toHaveCount(expectCount);
    }

    //     async clickProductByName(productName: keyof typeof products): Promise<void> {
    //         const productId = products[productName]

    // const productSelector = `a[href*="inventory-item.html?id=${productId}"]`;
    // await this.page.locator(productSelector).waitFor({ state: 'visible', timeout: 5000 });
    //       await this.page.click(productSelector);
    // await expect(this.page).toHaveURL(new RegExp(`inventory-item.html\\?id=${productId}$`));
    //     }

    async selectSorting() {
        await this.sortDropdown.selectOption('lohi');
    }

    async verifyPrice() {
        const prices = await this.itemPrices.allTextContents();
        console.log(prices);
    }
}
