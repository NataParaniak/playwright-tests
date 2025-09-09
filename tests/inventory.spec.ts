import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import users from '../data/users.json';
import products from '../data/products.json';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
    await loginPage.login(users.standard_user.username, users.standard_user.password);
});

test(`User can сheck that there are ${products.productsCount} products on the inventory page`, async () => {
    await inventoryPage.verifyNumberOfItems(products.productsCount);
});

// test('Product name are clickable', async ({ page }) => {
//     await inventoryPage.clickProductByName('Sauce Labs Backpack');

// });

// test('Check the button change to "REMOVE"', async ({ page }) => {
//     const button = page.locator('button[data-test^="add-to-cart"]').first();
//     await expect(button).toHaveText('Add to cart');
//     await button.click();
//     await expect(button).toHaveText('Remove');
// });
