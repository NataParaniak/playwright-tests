import { Locator } from '@playwright/test';
import { parsePrice } from '../utils/ParsePrice';

export default class InventoryItemComponent {
    private readonly button: Locator;

    private readonly title: Locator;

    private readonly description: Locator;

    private readonly price: Locator;

    constructor(private readonly root: Locator) {
        this.button = this.root.locator('button');
        this.title = this.root.locator('.inventory_item_name');
        this.description = this.root.locator('.inventory_item_desc');
        this.price = this.root.locator('.inventory_item_price');
    }

    getTitle(): Locator {
        return this.title;
    }

    getDescription(): Locator {
        return this.description;
    }

    getButton(): Locator {
        return this.button;
    }

    async addToCart(): Promise<void> {
        await this.getButton().click();
    }

    async getPriceValue(): Promise<number> {
        const text = await this.price.innerText();

        return parsePrice(text);
    }
}
