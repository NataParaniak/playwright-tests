import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import users from '../data/users.json';
import SideBarPage from '../pages/SideBarPage';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let sideBarPage: SideBarPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    sideBarPage = new SideBarPage(page);
    await loginPage.navigate();
});

test('User can log in with valid credentials', async () => {
    await loginPage.login(users.standard_user.username, users.standard_user.password);
    await inventoryPage.assertOnInventoryPage();
});

test('Check if the user is blocked', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.verifyLockedUser();
});

test('Check text visibility on login page', async () => {
    await loginPage.verifyHeaderText();
});

test('Logout from application', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    inventoryPage = new InventoryPage(page);
    await sideBarPage.logOut();
    await loginPage.assertOnLoginPage();
});
