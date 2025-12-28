import { Page, expect, Locator } from '@playwright/test';
import BasePage from './BasePage';

export default class LoginPage extends BasePage {
    private url = '/';

    private usernameInput: string;

    private passwordInput: string;

    private loginButton: Locator;

    private textHeader: Locator;

    private loginPageLogo: Locator;

    private loginCredential: string;

    private passwordCredential: string;

    constructor(page: Page) {
        super(page);
        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.loginButton = page.locator('#login-button');
        this.textHeader = page.locator("//h4[text()='Accepted usernames are:']");
        this.loginPageLogo = page.locator('.bot_column');
        this.loginCredential = '#login_credentials';
        this.passwordCredential = '.login_password';
    }

    async navigate() {
        await super.navigate(this.url);
    }

    async assertOnLoginPage() {
        await expect(this.page, 'User is expected to be on the login page').toHaveURL(
            'https://www.saucedemo.com',
        );
    }

    async login(username: string, password: string): Promise<void> {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.loginButton.click();
    }

    async veryfyLogoPage(): Promise<void> {
        await this.loginPageLogo.isVisible();
    }

    async verifyTitile(): Promise<void> {
        expect(this.page, 'Page title should contain "Swag"').toHaveTitle(/Swag/);
    }

    async verifyUrl(): Promise<void> {
        expect(this.page, 'Page url should contain "saucedemo"').toHaveURL(/saucedemo/);
    }

    async usernameFieldVisible(): Promise<void> {
        return this.isElementVisible(this.usernameInput, 'The usernamefield must be visible.');
    }

    async userpasswordFieldVisible(): Promise<void> {
        return this.isElementVisible(this.passwordInput, 'The paswordfield must be visible.');
    }

    async loginCredentialsVisible(): Promise<void> {
        return this.isElementEnabled(this.loginCredential);
    }

    async passwordCredentialsVisible(): Promise<void> {
        return this.isElementEnabled(this.passwordCredential);
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

    async isLoginButtonEnabled(): Promise<boolean> {
        return this.loginButton.isEnabled();
    }
}
