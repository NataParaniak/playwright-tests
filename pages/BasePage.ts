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
        try {
            const isVisible = await element.isVisible();
            expect(isVisible).toBeTruthy();
        } catch (error) {
            throw new Error(`${errorMessage}. Details: ${error}`);
        }
    }

    async isElementEnabled(selector: string) {
        const element = this.page.locator(selector);
        const isEnabled = await element.isEnabled();
        expect(isEnabled, 'Element is enabled').toBeTruthy();
    }
}
