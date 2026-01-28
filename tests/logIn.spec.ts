import { test } from '../fixtures/fixtures';
import users from '../data/users.json';

test.beforeEach(async ({ pages }) => {
    const { loginPage } = pages;
    await loginPage.navigate();
});

test('User can log in with valid credentials', async ({ loginStandardUser, pages }) => {
    const { inventoryPage } = pages;
    await loginStandardUser;
    await inventoryPage.assertOnInventoryPage();
});

test('Check if the user is blocked', async ({ pages }) => {
    const { loginPage } = pages;
    await loginPage.login(users.lockedUser.username, users.lockedUser.password);
    await loginPage.verifyLockedUser();
});

test('Verify Logo, Tittle, Url are visible on login page', async ({ pages }) => {
    const { loginPage } = pages;
    await loginPage.veryfyLogoPage();
    await loginPage.verifyTitile();
    await loginPage.verifyUrl();
});

test('Verify username and password fields are visible on login page', async ({ pages }) => {
    const { loginPage } = pages;
    await loginPage.usernameFieldVisible();
    await loginPage.userpasswordFieldVisible();
});
test('Verify login button are enable on login page', async ({ pages }) => {
    const { loginPage } = pages;
    await loginPage.isLoginButtonEnabled();
});

test('Verify that the text “Accepted usernames are:” is visible on the login page', async ({
    pages,
}) => {
    const { loginPage } = pages;
    await loginPage.verifyHeaderText();
});

test('Verify Login and password credentials are visible at the bottom of login page', async ({
    pages,
}) => {
    const { loginPage } = pages;
    await loginPage.loginCredentialsVisible();
    await loginPage.passwordCredentialsVisible();
});

test('Logout from application', async ({ loginStandardUser, pages }) => {
    const { loginPage, sideBarPage } = pages;
    await loginStandardUser;
    await sideBarPage.logOut();
    await loginPage.assertOnLoginPage();
});
