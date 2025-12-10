import { Locator, Page } from '@playwright/test';
import InventoryPage from './InventoryPage';

export default class InventoryItemComponent extends InventoryPage {
    readonly title: Locator;

    constructor(page: Page) {
        super(page);
        this.title = page.locator('.inventory_item_name');
    }

    getProductCard(productName: string) {
        return this.page
            .locator('.inventory_item')
            .filter({ has: this.page.locator('.inventory_item_name', { hasText: productName }) });
    }

    static getTitleName(card: Locator) {
        return card.locator('.inventory_item_name');
    }

    static getDescription(card: Locator) {
        return card.locator('.inventory_item_desc');
    }

    static getPrice(card: Locator) {
        return card.locator('.inventory_item_price');
    }

    static getButton(card: Locator) {
        return card.locator('button');
    }
}
