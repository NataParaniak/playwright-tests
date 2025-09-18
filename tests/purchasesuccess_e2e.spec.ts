import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckOutPage';
import CheckoutoverviewPage from '../pages/CheckOutOverviewPage';
import SuccessfullorderPage from '../pages/SuccessfullOrderPage';
import HeaderPage from '../pages/HeaderPage';
import users from '../data/users.json';
import adress from '../data/adress.json';

test.describe('Sausdemo e2e', async () => {
    test('Successful purchase', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const checkoutoverviewPage = new CheckoutoverviewPage(page);
        const successfullorderPage = new SuccessfullorderPage(page);
        const headerPage = new HeaderPage(page);

        await loginPage.navigate();
        await loginPage.login(users.standard_user.username, users.standard_user.password);
        await inventoryPage.assertOnInventoryPage();
        await inventoryPage.clickAddButtonFirst();
        await headerPage.goToCart();
        await cartPage.clickCheckoutButton();
        await checkoutPage.fillData(adress.firstName, adress.lastName, adress.postalCode);
        await checkoutoverviewPage.clickFinishButton();
        await successfullorderPage.successfullMessageVisible();
    });
});
