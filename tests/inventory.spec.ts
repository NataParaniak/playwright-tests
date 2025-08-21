import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import InventoryPage from '../pages/inventoryPage';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    //  await expect(page).toHaveURL(/inventory/);
});

test('User can сheck that there are 6 products on the inventory page', async () => {
    await inventoryPage.verifyNumberOfItems(6);
    await inventoryPage.takeScreenshot();
});

test('Product name are clickable', async ({ page }) => {
    await inventoryPage.nameProductClickable();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
    await inventoryPage.takeScreenshot();
});

test('Check the button change to "REMOVE"', async ({ page }) => {
    const button = page.locator('button[data-test^="add-to-cart"]').first();
    await expect(button).toHaveText('Add to cart');
    await button.click();
    await expect(button).toHaveText('Remove');
});
