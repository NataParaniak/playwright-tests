import { test } from '../fixtures/fixtures';

test.beforeEach(async ({ inventoryPage, loginStandardUser }) => {
    await loginStandardUser;
    await inventoryPage.assertOnInventoryPage();
});

test('User can check for cart image ', async ({ headerPage, addToCartFirstProduct }) => {
    await addToCartFirstProduct('Sauce Labs Backpack');
    await headerPage.assertCartIconVisible();
    await headerPage.assertCartHasItemCount(1);
});
