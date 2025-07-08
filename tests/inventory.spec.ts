import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';

let loginPage: LoginPage;
let dashboardPage:DashboardPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.navigateTo('/');
});

test('User can сheck that there are 6 products on the inventory page', async ({ page }) => {
  dashboardPage=new DashboardPage(page)
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
  await dashboardPage.verifyNumberOfItems(6);
  await dashboardPage.takeScreenshot();
});
test('Product name are clickable', async ({ page }) => {
  dashboardPage=new DashboardPage(page)
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
 await dashboardPage.nameProductClickable();
 await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
  await dashboardPage.takeScreenshot();
});

test('Check the button change to "REMOVE"',async ({page}) => {
    dashboardPage=new DashboardPage(page)
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
  const button = page.locator('button[data-test^="add-to-cart"]').first()
  await expect(button).toHaveText('Add to cart')
 await button.click()
  await expect(button).toHaveText('Remove')
})