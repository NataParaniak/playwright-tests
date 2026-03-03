import { expect, test } from '../fixtures/fixtures';
import InventoryPage from '../pages/InventoryPage';
import HeaderPage from '../pages/HeaderPage';

test.beforeEach(async ({ page, loginStandardUser }) => {
    const inventoryPage = new InventoryPage(page);
    await loginStandardUser;
    await inventoryPage.assertOnInventoryPage();
});

test('User can add multiple items to cart and cart counter updates correctly', async ({ page }) => {
    const headerPage = new HeaderPage(page);
    const inventoryPage = new InventoryPage(page);

    const backpack = inventoryPage.getProduct('Sauce Labs Backpack');
    const bikeLight = inventoryPage.getProduct('Sauce Labs Bike Light');
    await backpack.addToCart();

    await headerPage.assertCartIconVisible();
    await headerPage.assertCartHasItemCount(1);
    await expect(headerPage.cartImage).toBeVisible();

    await bikeLight.addToCart();
    await headerPage.assertCartHasItemCount(2);
});
