import { test as base, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import users from '../data/users.json';

type Fixtures = {
    loginStandardUser: void;
    completePurchase: void;
};

export const test = base.extend<Fixtures>({
    loginStandardUser: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(users.standardUser.username, users.standardUser.password);
        await use();
    },
});

export { expect };
