import { test, expect } from '../fixtures/fixtures';

test.beforeEach(async ({ inventoryPage, loginStandardUser }) => {
    await loginStandardUser;
    await inventoryPage.assertOnInventoryPage();
});

test('The user has the ability to sort "low to high" ', async ({ inventoryPage }) => {
    await inventoryPage.selectLowToHighFromDropDown();

    const prices = await inventoryPage.getAllPrices();
    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices, 'Products are sorted from low to high').toEqual(sorted);
});
test('The user has the ability to sort "high to low" ', async ({ inventoryPage }) => {
    await inventoryPage.selectHighToLowFromDropDown();
    const prices = await inventoryPage.getAllPrices();
    const sorted = [...prices].sort((a, b) => b - a);

    expect(prices, 'Products are sorted from high to low').toEqual(sorted);
});
