import { Pages } from '../fixtures/fixtures';

export async function completePurchase(
    pages: Pages,
    address: {
        firstName: string;
        lastName: string;
        postalCode: string;
    },
): Promise<void> {
    const {
        inventoryPage,
        cartPage,
        checkoutPage,
        checkoutoverviewPage,
        successfullOrderPage,
        headerPage,
    } = pages;

    const product = inventoryPage.getProduct('Sauce Labs Backpack');
    await product.addToCart();

    await headerPage.goToCart();
    await cartPage.clickCheckout();

    await checkoutPage.fillData(address.firstName, address.lastName, address.postalCode);
    await checkoutoverviewPage.clickFinishButton();
    await successfullOrderPage.verifySuccessfullMessageVisible();
}
