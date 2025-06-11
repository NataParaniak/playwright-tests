import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';

let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.navigateTo('https://www.saucedemo.com/v1/');
});

test('User can log in with valid credentials', async ({ page }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
});



test('Сheck if the user is blocked', async ({ page }) => {
  await loginPage.login('locked_out_user', 'secret_sauce');
 await expect(page.getByText('Epic sadface:')).toBeVisible();

});

test('Сheck text visibles', async ({ page }) => {
 await loginPage.verifyTextHeader()

});

test('logout from app', async({page}) => {
  await loginPage.login('standard_user', 'secret_sauce');
  const dashboardPage= new DashboardPage(page);
  await dashboardPage.logOutToApplication();
} )