import { test } from '../fixtures/fixtures';
import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import users from '../data/users.json';
import SideBarPage from '../pages/SideBarPage';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
});

test('User can log in with valid credentials', async ({ loginUser }) => {
    const inventoryPage = new InventoryPage(loginUser);
    await inventoryPage.assertOnInventoryPage();
});

test('Verify Logo, Tittle, Url are visible on login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.veryfyLogoPage();
    await loginPage.verifyTitile();
    await loginPage.verifyUrl();
});

test('Verify username and password fields are visible on login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.assertUsernameFieldVisible();
    await loginPage.assertUserPasswordFieldVisible();
});
test('Verify login button are enable on login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.isLoginButtonEnabled();
});

test('Verify that the text “Accepted usernames are:” is visible on the login page', async ({
    page,
}) => {
    const loginPage = new LoginPage(page);
    await loginPage.assertHeaderText('Accepted usernames are:');
});
test('Accepted usernames header should not be incorrect', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.assertAcceptedHeaderIsNot('ac');
});

test('Verify Login and password credentials are visible at the bottom of login page', async ({
    page,
}) => {
    const loginPage = new LoginPage(page);
    await loginPage.assertLoginCredentialsVisible();
    await loginPage.assertPasswordCredentialsVisible();
});

test('Logout from application', async ({ loginUser }) => {
    const loginPage = new LoginPage(loginUser);
    const sideBarPage = new SideBarPage(loginUser);

    await sideBarPage.logOut();
    await loginPage.assertOnLoginPage();
});
test.describe('Locked user', () => {
    test.use({ user: users.lockedUser });

    test('Check if the user is blocked', async ({ loginUser }) => {
        const loginPage = new LoginPage(loginUser);
        await loginPage.assertVerifyLockedUser();
    });
});
