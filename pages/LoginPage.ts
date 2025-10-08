import { Page, expect, Locator } from '@playwright/test';
import BasePage from './BasePage';

export default class LoginPage extends BasePage {
    private url = '/';

    private usernameInput: string;

    private passwordInput: string;

    private loginButton: string;

    private textHeader: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.loginButton = '#login-button';
        this.textHeader = page.locator("//h4[text()='Accepted usernames are:']");
    }

    async navigate() {
        await super.navigate(this.url);
    }

    async assertOnLoginPage() {
        await expect(this.page, 'User is expected to be on the login page').toHaveURL(
            ' https://www.saucedemo.com/',
        );
    }

    async login(username: string, password: string): Promise<void> {
        await this.type(this.usernameInput, username);
        await this.type(this.passwordInput, password);
        await this.click(this.loginButton);
    }

    async verifyHeaderText(): Promise<void> {
        await expect(this.textHeader, 'User is expected to see text on the page').toBeVisible();
    }

    async verifyLockedUser(): Promise<void> {
        await expect(
            this.page.getByText('Epic sadface:'),
            'User is expected to stay on the same page and see text',
        ).toBeVisible();
    }
}
