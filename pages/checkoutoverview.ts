import { Page, Locator } from '@playwright/test';
import BasePage from './basePage';

export default class checkoutoverviewPage extends BasePage {
    private finishButton: Locator;

    constructor(page: Page) {
        super(page);
        this.finishButton = page.locator('.btn_action.cart_button');
    }

    async finishClick(): Promise<void> {
        await this.finishButton.click();
    }
}
