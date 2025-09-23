import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import users from '../data/users.json';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
    await loginPage.login(users.standard_user.username, users.standard_user.password);
    await inventoryPage.assertOnPage();
});

test('The user has the ability to sort ', async () => {
    await inventoryPage.selectSorting();
    await inventoryPage.verifyPrice();
});
