import { test as base, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import SideBarPage from '../pages/SideBarPage';
import users from '../data/users.json';

type MyFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    loginStandardUser: LoginPage;
    sideBarPage: SideBarPage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },
    sideBarPage: async ({ page }, use) => {
        const sideBarPage = new SideBarPage(page);
        await use(sideBarPage);
    },

    loginStandardUser: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(users.standardUser.username, users.standardUser.password);
        await use(loginPage);
    },
});

export { expect };
