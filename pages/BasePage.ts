import { Page, expect } from '@playwright/test';

export default class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string): Promise<void> {
        await this.page.goto(`https://www.saucedemo.com${url}`);
    }

    async isElementVisible(selector: string, errorMessage: string) {
        const element = this.page.locator(selector);
        await expect(element, errorMessage).toBeVisible();
    }

    async isElementEnabled(selector: string) {
        const element = this.page.locator(selector);
        await expect(element, 'Element should be enabled').toBeEnabled();
    }
}
