import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.navigateTo('/');
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
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.logOutToApplication();
});