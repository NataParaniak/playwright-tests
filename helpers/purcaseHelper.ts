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
    const product = new InventoryPage(page).getProduct('Sauce Labs Backpack');
    await product.addToCart();

    await new HeaderPage(page).goToCart();
    await new CartPage(page).clickCheckout();

    await new CheckoutPage(page).fillData(address.firstName, address.lastName, address.postalCode);

    await new CheckoutoverviewPage(page).clickFinishButton();
}
