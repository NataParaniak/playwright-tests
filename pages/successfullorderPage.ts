import { Page, Locator, expect } from '@playwright/test';
import BasePage from './basePage';

export default class successfullorderPage extends BasePage {
    public successfullMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.successfullMessage = page.locator('h2');
    }

    async successfullMessageVisible() {
        await expect(this.successfullMessage).toContainText('Thank you for your order!');
    }
}
