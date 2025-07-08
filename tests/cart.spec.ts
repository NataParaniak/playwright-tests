import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';

let loginPage: LoginPage;
let dashboardPage: DashboardPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  dashboardPage=new DashboardPage(page);
  await loginPage.navigateTo('/');
});

test('User can check for cart image ', async ({ page }) => {
 
  await loginPage.login('standard_user', 'secret_sauce');
   await expect(page).toHaveURL(/inventory/);
   
  await dashboardPage.clickAddButtonFirst()
  
})