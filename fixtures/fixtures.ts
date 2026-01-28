import { test as base, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import SideBarPage from '../pages/SideBarPage';
import CartPage from '../pages/CartPage';
import HeaderPage from '../pages/HeaderPage';
import CheckoutPage from '../pages/CheckOutPage';
import CheckoutoverviewPage from '../pages/CheckOutOverview';
import SuccessfullOrderPage from '../pages/SuccessfullOrderPage';
import users from '../data/users.json';

export type Pages = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    sideBarPage: SideBarPage;
    headerPage: HeaderPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    checkoutoverviewPage: CheckoutoverviewPage;
    successfullOrderPage: SuccessfullOrderPage;
};

type Fixtures = {
    pages: Pages;
    loginStandardUser: void;
    completePurchase: void;
};

export const test = base.extend<Fixtures>({
    pages: async ({ page }, use) => {
        await use({
            loginPage: new LoginPage(page),
            inventoryPage: new InventoryPage(page),
            sideBarPage: new SideBarPage(page),
            headerPage: new HeaderPage(page),
            cartPage: new CartPage(page),
            checkoutPage: new CheckoutPage(page),
            checkoutoverviewPage: new CheckoutoverviewPage(page),
            successfullOrderPage: new SuccessfullOrderPage(page),
        });
    },

    loginStandardUser: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(users.standardUser.username, users.standardUser.password);
        await use();
    },
});

export { expect };
