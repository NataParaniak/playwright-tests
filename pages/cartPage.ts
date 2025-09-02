import { Page, Locator } from '@playwright/test';
import BasePage from './basePage';

export default class CartPage extends BasePage {
    private checkout: Locator;

    constructor(page: Page) {
        super(page);
        this.checkout = page.locator('.btn_action.checkout_button');
    }

    async checkoutClick(): Promise<void> {
        await this.checkout.click();
    }
}
