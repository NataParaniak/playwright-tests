import { Page, Locator } from '@playwright/test';
import BasePage from './BasePage';

export default class CheckoutPage extends BasePage {
    private firstNameInput: Locator;

    private lastNameInput: Locator;

    private postalCodeInput: Locator;

    private continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('.btn_primary.cart_button');
    }

    async fillData(firstname: string, lastname: string, postalcode: string): Promise<void> {
        await this.firstNameInput.fill(firstname);
        await this.lastNameInput.fill(lastname);
        await this.postalCodeInput.fill(postalcode);
        await this.continueButton.click();
    }
}
