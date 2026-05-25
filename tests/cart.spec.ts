import { expect, test } from '../fixtures/fixtures';
import InventoryPage from '../pages/InventoryPage';
import HeaderPage from '../pages/HeaderPage';
import CartPage from '../pages/CartPage';
import { Products } from '../constans/products';

test.beforeEach(async ({ loginUser }) => {
    const inventoryPage = new InventoryPage(loginUser);
    await inventoryPage.assertOnInventoryPage();
});

test('User can add multiple items to cart and cart counter updates correctly', async ({ page }) => {
    const headerPage = new HeaderPage(page);
    const inventoryPage = new InventoryPage(page);

    const backpack = inventoryPage.getProduct(Products.Backpack);
    const bikeLight = inventoryPage.getProduct(Products.BikeLight);
    await backpack.addToCart();

    await headerPage.assertCartIconVisible();
    await headerPage.assertCartHasItemCount(1);
    await expect(headerPage.cartImage, 'Cart icon should be visible in the header').toBeVisible();

    await bikeLight.addToCart();
    await headerPage.assertCartHasItemCount(2);
});
test('Items are visible in cart', async ({ page }) => {
    const headerPage = new HeaderPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const backpack = inventoryPage.getProduct(Products.Backpack);
    await backpack.addToCart();
    await headerPage.goToCart();
    await cartPage.assertProductInCart(Products.Backpack);
});
