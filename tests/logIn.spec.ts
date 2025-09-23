import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import users from '../data/users.json';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    loginPage = new LoginPage(page);
    await loginPage.navigate();
});

test('User can log in with valid credentials', async () => {
    await loginPage.login(users.standard_user.username, users.standard_user.password);
    await inventoryPage.assertOnPage();
});

test('Check if the user is blocked', async ({ page }) => {
    await loginPage.login(users.locked_user.username, users.locked_user.password);
    await expect(page.getByText('Epic sadface:')).toBeVisible();
});

test('Check text visibility on login page', async () => {
    await loginPage.verifyHeaderText();
});

test('Logout from application', async () => {
    await loginPage.login(users.standard_user.username, users.standard_user.password);
    await inventoryPage.logOutToApplication();
});
