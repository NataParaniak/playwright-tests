import { Page, Locator } from '@playwright/test';
import BasePage from './BasePage';

export default class HeaderPage extends BasePage {
    private menuButton: Locator;

    private cartImage: Locator;

    constructor(page: Page) {
        super(page);
        this.menuButton = page.locator("//button[text()='Open Menu']");
        this.cartImage = page.locator('#shopping_cart_container');
    }

    async goToSideBar(): Promise<void> {
        await this.menuButton.click();
    }

    async goToCart(): Promise<void> {
        await this.cartImage.click();
    }
}
