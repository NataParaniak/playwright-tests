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

    // getTitleName(card: Locator) {
    //     return card.locator('.inventory_item_name');
    // }

    //  getDescription(card: Locator) {
    //     return card.locator('.inventory_item_desc');
    // }

    //  getPrice(card: Locator) {
    //     return card.locator('.inventory_item_price');
    // }

    // getButton(card: Locator) {
    //     return card.locator('button');
    // }
}
