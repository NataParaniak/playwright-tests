import { test } from '../fixtures/fixtures';
import adress from '../data/adress.json';

test.describe('Sausdemo e2e', async () => {
    test('Successful purchase', async ({
        loginStandardUser,
        inventoryPage,
        cartPage,
        inventoryComponentItem,
        checkoutPage,
        checkoutoverviewPage,
        successfullOrderPage,
        headerPage,
    }) => {
        await loginStandardUser;
        await inventoryPage.assertOnInventoryPage();
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await headerPage.goToCart();
        await cartPage.clickCheckout();
        await checkoutPage.fillData(
            adress.standardUser.username,
            adress.standardUser.surname,
            adress.standardUser.postalcode,
        );
        await inventoryComponentItem.getProductCardLocator('Sauce Labs Backpack');
        await checkoutoverviewPage.сlickFinishButton();
        await successfullOrderPage.verifySuccessfullMessageVisible();
    });
});
