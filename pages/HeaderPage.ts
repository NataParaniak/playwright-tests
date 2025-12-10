import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';

export default class HeaderPage extends BasePage {
    readonly menuButton: Locator;

    readonly cartImage: Locator;

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

    async assertCartIconVisible(): Promise<void> {
        await expect(this.cartImage, 'User is expected to see icon cart on the page').toBeVisible();
    }

    async assertCartHasItemCount(count: number) {
        await expect(
            this.cartImage,
            'User is expected to see the number of items in the cart',
        ).toHaveText(String(count), { timeout: 10000 });
    }
}
