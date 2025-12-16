import { test } from '../fixtures/fixtures';
import users from '../data/users.json';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
});

test('User can log in with valid credentials', async ({ loginStandardUser, inventoryPage }) => {
    await loginStandardUser;
    await inventoryPage.assertOnInventoryPage();
});

test('Check if the user is blocked', async ({ loginPage }) => {
    await loginPage.login(users.lockedUser.username, users.lockedUser.password);
    await loginPage.verifyLockedUser();
});

test('Verify Logo, Tittle, Url are visible on login page', async ({ loginPage }) => {
    await loginPage.veryfyLogoPage();
    await loginPage.verifyTitile();
    await loginPage.verifyUrl();
});

test('Verify username and password fields are visible on login page', async ({ loginPage }) => {
    await loginPage.usernameFieldVisible();
    await loginPage.userpasswordFieldVisible();
});
test('Verify login button are enable on login page', async ({ loginPage }) => {
    await loginPage.loginButtonIsEnabled();
});

test('Verify that the text “Accepted usernames are:” is visible on the login page', async ({
    loginPage,
}) => {
    await loginPage.verifyHeaderText();
});

test('Verify Login and password credentials are visible at the bottom of login page', async ({
    loginPage,
}) => {
    await loginPage.loginCredentialsVisible();
    await loginPage.passwordCredentialsVisible();
});

test('Logout from application', async ({ loginStandardUser, loginPage, sideBarPage }) => {
    await loginStandardUser;
    await sideBarPage.logOut();
    await loginPage.assertOnLoginPage();
});
