import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';
import productsData from '../data/products.json';

test.beforeEach(async ({ inventoryPage, loginStandardUser }) => {
    await loginStandardUser;
    await inventoryPage.assertOnInventoryPage();
});

test(`User can check that products are visible on the inventory page`, async ({
    inventoryPage,
    loginStandardUser,
}) => {
    await loginStandardUser;
    await inventoryPage.assertProductsCount(6);
});

test('Product name are clickable', async ({ page, inventoryComponentItem }) => {
    const product = productsData.products[0];
    const card = inventoryComponentItem.getProductCardLocator(product.name);
    const title = inventoryComponentItem.getTitleNameLocator(card);
    await title.click();
    await expect(page).toHaveURL(/inventory-item\.html/);
});

test('Check product card structure and text content', async ({ inventoryComponentItem }) => {
    const product = productsData.products[0];
    const card = inventoryComponentItem.getProductCardLocator(product.name);
    await expect(card).toHaveCount(1);

    const title = inventoryComponentItem.getTitleNameLocator(card);
    const description = inventoryComponentItem.getDescriptionLocator(card);
    const price = inventoryComponentItem.getPriceLocator(card);
    const button = inventoryComponentItem.getButtonLocator(card);

    await expect(title).toBeVisible();
    await expect(description).toBeVisible();
    await expect(price).toBeVisible();
    await expect(button).toBeVisible();

    await expect(title).toHaveText(product.name);
    await expect(description).toContainText(product.description);
    await expect(price).toHaveText(product.price);
    await expect(button).toHaveText(/Add to cart/i);
});

test('Check the button change to "REMOVE"', async ({ inventoryComponentItem }) => {
    const product = productsData.products[0];
    const card = inventoryComponentItem.getProductCardLocator(product.name);
    const button = inventoryComponentItem.getButtonLocator(card);
    await expect(button).toHaveText(/Add to cart/i);
    await button.click();
    await expect(button).toHaveText(/Remove/i);
});
test('Check if the user pressed the "ADD TO CART" button twice', async ({
    inventoryComponentItem,
}) => {
    const product = productsData.products[0];
    const card = inventoryComponentItem.getProductCardLocator(product.name);
    const button = inventoryComponentItem.getButtonLocator(card);
    await expect(button).toHaveText(/Add to cart/i);
    await button.dblclick();
    await expect(button).toHaveText(/Add to cart/i);
});
