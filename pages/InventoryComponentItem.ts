import { Locator } from '@playwright/test';
import InventoryPage from './InventoryPage';

export default class InventoryItemComponent extends InventoryPage {
    getTitleNameLocator(card: Locator): Locator {
        return card.locator('.inventory_item_name');
    }

    getDescriptionLocator(card: Locator): Locator {
        return card.locator('.inventory_item_desc');
    }

    getPriceLocator(card: Locator): Locator {
        return card.locator('.inventory_item_price');
    }

    getButtonLocator(card: Locator): Locator {
        return card.locator('button');
    }
}
