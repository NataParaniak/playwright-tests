import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';

export default class CartPage extends BasePage {
    readonly checkout: Locator;

    readonly cartItem: Locator;

    constructor(page: Page) {
        super(page);
        this.checkout = page.locator('#checkout');
        this.cartItem = page.locator('.cart_item');
    }

    async clickCheckout(): Promise<void> {
        await this.checkout.click();
    }

    async assertProductInCart(productName: string): Promise<void> {
        const productLocator = this.cartItem.filter({ hasText: productName });

        await expect(
            productLocator,
            `Product "${productName}" should be visible in cart`,
        ).toBeVisible();
    }
}
