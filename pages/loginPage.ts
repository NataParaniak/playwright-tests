import { Page, expect } from '@playwright/test';
import BasePage from './basePage';

export default class LoginPage extends BasePage {
    private url = '/';

    private usernameInput: string;

    private passwordInput: string;

    private loginButton: string;

    private textHeader: string;

    constructor(page: Page) {
        super(page);
        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.loginButton = '#login-button';
        this.textHeader = "//h4[text()='Accepted usernames are:']";
    }

    async navigate() {
        await super.navigate(this.url);
    }

    async login(username: string, password: string): Promise<void> {
        await this.type(this.usernameInput, username);
        await this.type(this.passwordInput, password);
        await this.click(this.loginButton);
    }

    async verifyTextHeader(): Promise<void> {
        await expect(this.page.locator(this.textHeader)).toBeVisible();
    }
}
