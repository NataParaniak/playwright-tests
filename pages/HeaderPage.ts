import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';

export default class HeaderPage extends BasePage {
    readonly menuButton: Locator;

    readonly cartImage: Locator;

    readonly productQuantity: Locator;

    constructor(page: Page) {
        super(page);
        this.menuButton = page.locator("//button[text()='Open Menu']");
        this.cartImage = page.locator('#shopping_cart_container');
        this.productQuantity = page.locator('#shopping_cart_container .shopping_cart_badge');
    }

    async goToSideBar(): Promise<void> {
        await this.menuButton.click();
    }

    async goToCart(): Promise<void> {
        await this.cartImage.click();
    }

    async assertCartIconVisible(): Promise<void> {
        await expect(this.cartImage, 'User is expected to see icon cart on the page').toBeVisible();
    }

    async assertCartHasItemCount(expected: number): Promise<void> {
        const text = (await this.productQuantity.textContent()) ?? '';
        const actual = Number(text.match(/\d+/)?.[0]);

        expect(actual, `Expected ${expected} items in cart, but got ${actual}`).toBe(expected);
    }
}
