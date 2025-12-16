import { test } from '../fixtures/fixtures';

test.beforeEach(async ({ inventoryPage, loginStandardUser }) => {
    await loginStandardUser;
    await inventoryPage.assertOnInventoryPage();
});

test('User can check for cart image ', async ({ inventoryPage, headerPage }) => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await headerPage.assertCartIconVisible();
    await headerPage.assertCartHasItemCount(1);
});
