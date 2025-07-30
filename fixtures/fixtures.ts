import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';

type MyFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await page.goto('/');
        await loginPage.login('standard_user', 'secret_sauce');
        await use(loginPage);
    },

    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },
});

export { expect };
