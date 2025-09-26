import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckOutPage';
import CheckOutOverviewPage from '../pages/CheckOutOverview';
import SuccessfullOrderPage from '../pages/SuccessfullOrderPage';
import HeaderPage from '../pages/HeaderPage';
import users from '../data/users.json';

test.describe('Sausdemo e2e', async () => {
    test('Successful purchase', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const checkoutoverviewPage = new CheckOutOverviewPage(page);
        const successfullorderPage = new SuccessfullOrderPage(page);
        const headerPage = new HeaderPage(page);

        await loginPage.navigate();
        await loginPage.login(users.standard_user.username, users.standard_user.password);
        await inventoryPage.assertOnInventoryPage();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.assertOnInventoryPage();
        await inventoryPage.clickAddButtonFirst();
        await headerPage.goToCart();
        await cartPage.checkoutClick();
        await checkoutPage.dataFilling('Natalia', 'Paraniak', '79028');
        await checkoutoverviewPage.finishClick();
        await successfullorderPage.successfullMessageVisible();
    });
});
