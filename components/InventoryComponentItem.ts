import { Locator } from '@playwright/test';
import { parsePrice } from '../utils/ParsePrice';

export default class InventoryItemComponent {
    private readonly addToCartbutton: Locator;

    private readonly removeButton: Locator;

    private readonly title: Locator;

    private readonly description: Locator;

    private readonly price: Locator;

    constructor(private readonly root: Locator) {
        this.addToCartbutton = this.root.locator('button[data-test*="cart"]');
        this.removeButton = this.root.locator('[data-test*="remove"]');
        this.title = this.root.locator('.inventory_item_name');
        this.description = this.root.locator('.inventory_item_desc');
        this.price = this.root.locator('.inventory_item_price');
    }

    getTitle(): Locator {
        return this.title;
    }

    async clickTitle(): Promise<void> {
        await this.title.click();
    }

    getDescription(): Locator {
        return this.description;
    }

    getButton(): Locator {
        return this.addToCartbutton.or(this.removeButton);
    }

    async addToCart(): Promise<void> {
        await this.getButton().click();
    }

    async getPriceValue(): Promise<number> {
        const text = await this.price.innerText();

        return parsePrice(text);
    }
}
