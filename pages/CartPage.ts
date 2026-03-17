import { Page, Locator } from '@playwright/test';
import BasePage from './BasePage';

export default class CartPage extends BasePage {
    readonly checkout: Locator;

    constructor(page: Page) {
        super(page);
        this.checkout = page.locator('#checkout');
    }

    async clickCheckout(): Promise<void> {
        await this.checkout.click();
    }
}
