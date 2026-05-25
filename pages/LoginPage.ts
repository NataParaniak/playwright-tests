import { Page, expect, Locator } from '@playwright/test';
import BasePage from './BasePage';

export default class LoginPage extends BasePage {
    private url = '/';

    readonly usernameInput: Locator;

    readonly passwordInput: Locator;

    private loginButton: Locator;

    private textHeader: Locator;

    private loginPageLogo: Locator;

    private loginCredential: Locator;

    private passwordCredential: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.textHeader = this.page.getByText('Accepted usernames are:');
        this.loginPageLogo = page.locator('.bot_column');
        this.loginCredential = page.locator('#login_credentials');
        this.passwordCredential = page.locator('.login_password');
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
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
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
        await expect(this.usernameInput, 'Field username is visible').toBeVisible();
    }

    async assertPasswordFieldVisible(): Promise<void> {
        await expect(this.passwordInput, 'Field password is visible').toBeVisible();
    }

    async assertUserPasswordFieldVisible(): Promise<void> {
        await expect(this.passwordInput).toBeVisible();
    }

    async assertLoginCredentialsVisible(): Promise<void> {
        await expect(this.loginCredential).toBeEnabled();
    }

    async assertPasswordCredentialsVisible(): Promise<void> {
        await expect(this.passwordCredential).toBeEnabled();
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
