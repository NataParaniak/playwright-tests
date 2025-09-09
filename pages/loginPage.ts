import { Page, expect, Locator } from '@playwright/test';
import BasePage from './BasePage';

export default class LoginPage extends BasePage {
    private url = '/';

    private usernameInput: Locator;

    private passwordInput: Locator;

    private loginButton: Locator;

    private textHeader: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.textHeader = page.locator("//h4[text()='Accepted usernames are:']");
    }

    async navigate() {
        await super.navigate(this.url);
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async verifyHeaderText(): Promise<void> {
        await expect(this.textHeader).toBeVisible();
    }

    async verifyLockedUser(): Promise<void> {
        await expect(this.page.getByText('Epic sadface:')).toBeVisible();
    }
}
