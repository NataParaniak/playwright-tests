import { Page, expect, Locator } from '@playwright/test';
import BasePage from './BasePage';

export default class LoginPage extends BasePage {
    private url = '/';

    private usernameInput: string;

    private passwordInput: string;

    private loginButton: string;

    private textHeader: Locator;

    private loginPageLogo: Locator;

    private loginCredential: string;

    private passwordCredential: string;

    constructor(page: Page) {
        super(page);
        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.loginButton = '#login-button';
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
        await this.type(this.usernameInput, username);
        await this.type(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    async veryfyLogoPage(): Promise<void> {
        await this.loginPageLogo.isVisible();
    }

    async verifyTitile(): Promise<void> {
        const title = await this.getTitle();
        await expect(title, 'Page title should contain "Swag"').toContain('Swag');
    }

    async verifyUrl(): Promise<void> {
        const url = await this.getUrl();
        await expect(url, 'Page url should contain "saucedemo"').toContain('saucedemo');
    }

    async usernameFieldVisible(): Promise<void> {
        return await this.isElementVisible(
            this.usernameInput,
            'The usernamefield must be visible.',
        );
    }

    async userpasswordFieldVisible(): Promise<void> {
        return await this.isElementVisible(this.passwordInput, 'The paswordfield must be visible.');
    }

    async loginCredentialsVisible(): Promise<void> {
        return await this.isElementEnabled(this.loginCredential);
    }

    async passwordCredentialsVisible(): Promise<void> {
        return await this.isElementEnabled(this.passwordCredential);
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

    async loginButtonIsEnabled(): Promise<void> {
        return await this.isElementEnabled(this.loginButton);
    }
}
