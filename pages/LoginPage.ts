import { Page, expect, Locator } from '@playwright/test';
import BasePage from './BasePage';

export default class LoginPage extends BasePage {
    private url = '/';

    readonly usernameInput: string;

    readonly passwordInput: string;

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
        this.textHeader = this.page.getByText('Accepted usernames are:');
        this.loginPageLogo = page.locator('.bot_column');
        this.loginCredential = '#login_credentials';
        this.passwordCredential = '.login_password';
    }

    async navigate(): Promise<void> {
        await super.navigate(this.url);
    }

    async assertOnLoginPage(): Promise<void> {
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

    async assertUsernameFieldVisible(): Promise<void> {
        return this.assertElementVisible(this.usernameInput, 'The usernamefield must be visible.');
    }

    async assertUserPasswordFieldVisible(): Promise<void> {
        return this.assertElementVisible(this.passwordInput, 'The paswordfield must be visible.');
    }

    async assertLoginCredentialsVisible(): Promise<void> {
        return this.assertElementEnabled(this.loginCredential);
    }

    async assertPasswordCredentialsVisible(): Promise<void> {
        return this.assertElementEnabled(this.passwordCredential);
    }

    async assertHeaderText(expectedText: string): Promise<void> {
        await expect(this.textHeader, 'User is expected to see text on the page').toHaveText(
            expectedText,
        );
    }

    async assertAcceptedHeaderIsNot(wrongText: string): Promise<void> {
        await expect(this.textHeader).not.toHaveText(wrongText);
    }

    async assertVerifyLockedUser(): Promise<void> {
        await expect(
            this.page.getByText('Epic sadface:'),
            'User is expected to stay on the same page and see text',
        ).toBeVisible();
    }

    async isLoginButtonEnabled(): Promise<boolean> {
        return this.loginButton.isEnabled();
    }
}
