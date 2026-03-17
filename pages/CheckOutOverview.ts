import { Page, Locator } from '@playwright/test';
import BasePage from './BasePage';

export default class CheckoutoverviewPage extends BasePage {
    private finishButton: Locator;

    constructor(page: Page) {
        super(page);
        this.finishButton = page.locator('.btn_action.cart_button');
    }

    async clickFinishButton(): Promise<void> {
        await this.finishButton.click();
    }
}
