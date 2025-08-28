import { test } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import InventoryPage from '../pages/inventoryPage';
import CartPage from '../pages/cartPage';
import CheckoutPage from '../pages/checkoutPage';
import CheckoutoverviewPage from '../pages/checkoutoverview';
import SuccessfullorderPage from '../pages/successfullorderPage';

test.describe('Sausdemo e2e', async () => {
    test('успішний логін, додавання в кошик і checkout', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const checkoutoverviewPage = new CheckoutoverviewPage(page);
        const successfullorderPage = new SuccessfullorderPage(page);

        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.assertOnPage();
        await inventoryPage.clickAddButtonFirst();
        await inventoryPage.goToCart();
        await cartPage.checkoutClick();
        await checkoutPage.dataFilling('Natalia', 'Paraniak', '79028');
        await checkoutoverviewPage.finishClick();
        await successfullorderPage.successfullMessageVisible();
    });
});
