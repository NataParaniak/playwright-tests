import { Locator } from '@playwright/test';

export default class InventoryItemComponent {
    readonly firstAddButton: Locator;

    readonly secondAddButton: Locator;

    constructor(private readonly container: Locator) {
        this.firstAddButton = container
            .locator('.inventory_item', { hasText: 'Sauce Labs Backpack' })
            .locator('button[id^="add-to-cart"]');

        this.secondAddButton = container
            .locator('.inventory_item', { hasText: 'Sauce Labs Bike Light' })
            .locator('button[id^="add-to-cart"]');
    }

    getTitle(): Locator {
        return this.container.locator('.inventory_item_name');
    }

    getDescription(): Locator {
        return this.container.locator('.inventory_item_desc');
    }

    async getPrice(): Promise<number> {
        const text = await this.container.locator('.inventory_item_price').innerText();

        return Number(text.replace('$', ''));
    }

    getButton(): Locator {
        return this.container.locator('button');
    }

    async addToCart(): Promise<void> {
        await this.getButton().click();
    }

    async clickFirstButton(): Promise<void> {
        await this.firstAddButton.click();
    }

    async clickSecondButton(): Promise<void> {
        await this.secondAddButton.click();
    }
}
