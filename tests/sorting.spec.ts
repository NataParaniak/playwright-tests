import { test, expect } from '../fixtures/fixtures';
import InventoryPage from '../pages/InventoryPage';
import { SortOptions } from '../utils/SortOptions';
import { getAllProductPricesValue } from '../helpers/product.helper';
import { sortNumbers } from '../utils/sort';

test.describe('Inventory sorting', () => {
    test.beforeEach(async ({ page, loginUser }) => {
        const inventoryPage = new InventoryPage(page);
        await loginUser;
        await inventoryPage.assertOnInventoryPage();
    });

    const sortCases = [
        {
            name: 'low to high',
            option: SortOptions.LowToHigh,
            direction: 'asc' as const,
        },
        {
            name: 'high to low',
            option: SortOptions.HighToLow,
            direction: 'desc' as const,
        },
    ];

    sortCases.forEach(({ name, option, direction }) => {
        test(`User can sort ${name}`, async ({ page }) => {
            const inventoryPage = new InventoryPage(page);

            await inventoryPage.selectSortOption(option);

            const products = await inventoryPage.getAllProducts();
            const prices = await getAllProductPricesValue(products);

            const sorted = sortNumbers(prices, direction);

            expect(prices, `Products should be sorted ${name}`).toEqual(sorted);
        });
    });
});
