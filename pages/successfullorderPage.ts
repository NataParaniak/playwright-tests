import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';

export default class SuccessfullorderPage extends BasePage {
    public successfullMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.successfullMessage = page.locator('h2');
    }

    async successfullMessageVisible() {
        await expect(
            this.successfullMessage,
            'User was waiting for a notification about a successful order.',
        ).toContainText('Thank you for your order!');
    }
}
