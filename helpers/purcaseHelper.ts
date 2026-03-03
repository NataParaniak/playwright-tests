import { Page } from '@playwright/test';
import InventoryPage from '../pages/InventoryPage';
import HeaderPage from '../pages/HeaderPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckOutPage';
import CheckoutoverviewPage from '../pages/CheckOutOverview';

export async function completePurchase(
    page: Page,
    address: {
        firstName: string;
        lastName: string;
        postalCode: string;
    },
): Promise<void> {
    const inventoryPage = new InventoryPage(page);
    const headerPage = new HeaderPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutoverviewPage = new CheckoutoverviewPage(page);

    const product = inventoryPage.getProduct('Sauce Labs Backpack');
    await product.addToCart();

    await headerPage.goToCart();
    await cartPage.clickCheckout();

    await checkoutPage.fillData(address.firstName, address.lastName, address.postalCode);

    await checkoutoverviewPage.clickFinishButton();
}
