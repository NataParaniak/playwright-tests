import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.navigate();
});

test('User can log in with valid credentials', async ({ page }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
});

test('Check if the user is blocked', async ({ page }) => {
  await loginPage.login('locked_out_user', 'secret_sauce');
  await expect(page.getByText('Epic sadface:')).toBeVisible();
});

test('Check text visibility on login page', async () => {
  await loginPage.verifyTextHeader();
});

test('Logout from application', async ({ page }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  inventoryPage = new InventoryPage(page);
  await inventoryPage.logOutToApplication();
});
