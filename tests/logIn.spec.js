import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';

test('User can log in with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo('https://www.saucedemo.com/v1/');
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
});

test('Сheck if the user is blocked', async ({ page }) => {
 const loginPage = new LoginPage(page);
  await loginPage.navigateTo('https://www.saucedemo.com/v1/');
  await loginPage.login('locked_out_user', 'secret_sauce');
  await expect(page.getByText('Epic sadface:')).toBeVisible();
});

test.only('logout from app', async({page}) => {
   const loginPage = new LoginPage(page);
  await loginPage.navigateTo('https://www.saucedemo.com/v1/');
  await loginPage.login('standard_user', 'secret_sauce');
  const dashboardPage= new DashboardPage(page);
  await dashboardPage.loginToApplication()
} )