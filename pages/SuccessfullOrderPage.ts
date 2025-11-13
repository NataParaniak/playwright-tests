import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';

export default class SuccessfullOrderPage extends BasePage {
    public successfullMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.successfullMessage = page.locator('h2');
    }

    async verifySuccessfullMessageVisible() {
        await expect(
            this.successfullMessage,
            'User should see notification about a successful order',
        ).toContainText('Thank you for your order!');
    }
}
