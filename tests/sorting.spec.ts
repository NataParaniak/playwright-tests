import { test, expect } from '../fixtures/fixtures';
import { SortOptions } from '../utils/SortOptins';

test.beforeEach(async ({ pages, loginStandardUser }) => {
    const { inventoryPage } = pages;
    await loginStandardUser;
    await inventoryPage.assertOnInventoryPage();
});

test('The user has the ability to sort "low to high"', async ({ pages }) => {
    const { inventoryPage } = pages;
    await inventoryPage.selectSortOption(SortOptions.LowToHigh);

    const products = await inventoryPage.getAllProducts();

    const prices = await Promise.all(products.map(product => product.getPrice()));

    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices, 'Products are sorted from low to high').toEqual(sorted);
});

test('The user has the ability to sort "high to low"', async ({ pages }) => {
    const { inventoryPage } = pages;
    await inventoryPage.selectSortOption(SortOptions.HighToLow);

    const products = await inventoryPage.getAllProducts();

    const prices = await Promise.all(products.map(product => product.getPrice()));

    const sorted = [...prices].sort((a, b) => b - a);

    expect(prices, 'Products are sorted from high to low').toEqual(sorted);
});
