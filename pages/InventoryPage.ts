import { expect } from '@playwright/test';
import { SortOptions } from '../utils/SortOptions';
import BasePage from './BasePage';
import InventoryItemComponent from '../components/InventoryComponentItem';

export default class InventoryPage extends BasePage {
    private readonly url = '/inventory.html';

    readonly inventoryItems = this.page.locator('.inventory_item');

    readonly inventoryList = this.page.locator('.inventory_list');

    readonly productSortContainer = this.page.locator('.product_sort_container');

    async navigate(): Promise<void> {
        await super.navigate(this.url);
    }

    async assertOnInventoryPage(): Promise<void> {
        await expect(this.page, 'User is expected to be on the inventory page').toHaveURL(
            /.*inventory\.html/,
            { timeout: 7000 },
        );
    }

    getProduct(name: string): InventoryItemComponent {
        const card = this.inventoryItems.filter({ hasText: name });

        return new InventoryItemComponent(card);
    }

    async getAllProducts(): Promise<InventoryItemComponent[]> {
        const cards = await this.inventoryItems.all();

        return cards.map(card => new InventoryItemComponent(card));
    }

    async getProductsCount(): Promise<number> {
        return this.inventoryItems.count();
    }

    async assertProductsCount(expected: number): Promise<void> {
        const actual = await this.getProductsCount();
        expect(actual).toBe(expected);
    }

    async selectSortOption(option: SortOptions): Promise<void> {
        await this.productSortContainer.selectOption(option);
    }
}
