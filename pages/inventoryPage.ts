import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class InventoryPage extends BasePage {
    private url = '/inventory.html';

    private pagebutton: string;

    private logOut: string;

    private cartImage: string;

    private addToCartButton: string;

    private itemCards: Locator;

    private nameProduct: Locator;

    private firstButtonAddToCart: Locator;

    constructor(page: Page) {
        super(page);
        this.pagebutton = "//button[text()='Open Menu']";
        this.logOut = "//*[@id='logout_sidebar_link']";
        this.cartImage = '#shopping_cart_container';
        this.addToCartButton = "//button[text()='ADD TO CART']";
        this.itemCards = page.locator('.inventory_item');
        this.nameProduct = page.locator('.inventory_item_name').first();
        this.firstButtonAddToCart = page.locator('[data-test^="add-to-cart"]').first();
    }

    async navigate() {
        await super.navigate(this.url);
    }

    async logOutToApplication(): Promise<void> {
        await this.page.click(this.pagebutton);
        await this.page.click(this.logOut);
    }

    async clickAddButtonFirst(): Promise<void> {
        await this.firstButtonAddToCart.waitFor({ state: 'visible' });
        await this.firstButtonAddToCart.click();
    }

    async isCartVisible(): Promise<boolean> {
        return this.page.locator(this.cartImage).isVisible();
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
}
