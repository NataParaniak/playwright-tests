import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';

export default class SuccessfullOrderPage extends BasePage {
    public successfullMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.successfullMessage = page.locator('h2');
    }

    async successfullMessageVisible() {
        await expect(
            this.successfullMessage,
            'Очікував повідомлення про успішне замовлення',
        ).toContainText('Thank you for your order!');
    }
}
