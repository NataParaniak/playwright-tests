import { test as base, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import SideBarPage from '../pages/SideBarPage';
import CartPage from '../pages/CartPage';
import InventoryComponentItem from '../pages/InventoryComponentItem';
import HeaderPage from '../pages/HeaderPage';
import CheckoutPage from '../pages/CheckOutPage';
import CheckoutoverviewPage from '../pages/CheckOutOverview';
import SuccessfullOrderPage from '../pages/SuccessfullOrderPage';
import users from '../data/users.json';

type MyFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    loginStandardUser: LoginPage;
    sideBarPage: SideBarPage;
    inventoryComponentItem: InventoryComponentItem;
    headerPage: HeaderPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    checkoutoverviewPage: CheckoutoverviewPage;
    successfullOrderPage: SuccessfullOrderPage;
    addToCartFirstProduct: (productName: string) => Promise<void>;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },

    inventoryComponentItem: async ({ page }, use) => {
        const inventoryComponentItem = new InventoryComponentItem(page);
        await use(inventoryComponentItem);
    },

    sideBarPage: async ({ page }, use) => {
        const sideBarPage = new SideBarPage(page);
        await use(sideBarPage);
    },
    headerPage: async ({ page }, use) => {
        const headerPage = new HeaderPage(page);
        await use(headerPage);
    },
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },
    checkoutoverviewPage: async ({ page }, use) => {
        const checkoutoverviewPage = new CheckoutoverviewPage(page);
        await use(checkoutoverviewPage);
    },
    successfullOrderPage: async ({ page }, use) => {
        const successfullOrderPage = new SuccessfullOrderPage(page);
        await use(successfullOrderPage);
    },
    addToCartFirstProduct: async ({ inventoryPage }, use) => {
        await use(async (productName: string) => {
            await inventoryPage.addToCart(productName);
        });
    },

    loginStandardUser: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(users.standardUser.username, users.standardUser.password);
        await use(loginPage);
    },
});

export { expect };
