import { test as base, expect, Page } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import users from '../data/users.json';
import { User } from '../types/user';

type Fixtures = {
    user: User;
    loginUser: Page;
};

export const test = base.extend<Fixtures>({
    user: [users.standardUser, { option: true }],

    loginUser: async ({ page, user }, use) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigate();

        await loginPage.login(user.username, user.password);

        await use(page);
    },
});

export { expect };
