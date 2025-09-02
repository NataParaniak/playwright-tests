import { Page } from '@playwright/test';
import BasePage from './basePage';

export default class CheckoutPage extends BasePage {
    private firstNameInput: string;

    private lastNameInput: string;

    private postalCodeInput: string;

    private continueButton: string;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = '#first-name';
        this.lastNameInput = '#last-name';
        this.postalCodeInput = '#postal-code';
        this.continueButton = '.btn_primary.cart_button';
    }

    async dataFilling(firstname: string, lastname: string, postalcode: string): Promise<void> {
        await this.type(this.firstNameInput, firstname);
        await this.type(this.lastNameInput, lastname);
        await this.type(this.postalCodeInput, postalcode);
        await this.click(this.continueButton);
    }
}
