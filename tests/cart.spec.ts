import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import users from '../data/users.json';
import HeaderPage from '../pages/HeaderPage';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let headerPage: HeaderPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    headerPage = new HeaderPage(page);
    await loginPage.navigate();
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await inventoryPage.assertOnInventoryPage();
});

test('User can check for cart image ', async () => {
    await headerPage.assertCartIconVisible();
    await headerPage.assertCartHasItemCount(1);
});
