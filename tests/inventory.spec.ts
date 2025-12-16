import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';
import productsData from '../data/products.json';

test.beforeEach(async ({ inventoryPage, loginStandardUser }) => {
    await loginStandardUser;
    await inventoryPage.assertOnInventoryPage();
});

const productsCount = 6;
test(`User can check that there are ${productsCount} products on the inventory page`, async ({
    page,
    loginStandardUser,
}) => {
    await loginStandardUser;
    const products = page.locator('.inventory_item_name');
    await expect(products).toHaveCount(productsCount);
});

test('Product name are clickable', async ({ page, inventoryComponentItem }) => {
    const product = productsData.products[0];
    const card = inventoryComponentItem.getProductCard(product.name);
    const title = inventoryComponentItem.getTitleName(card);
    await title.click();
    await expect(page).toHaveURL(/inventory-item\.html/);
});

test('Check product card structure and text content', async ({ inventoryComponentItem }) => {
    const product = productsData.products[0];
    const card = inventoryComponentItem.getProductCard(product.name);
    await expect(card).toHaveCount(1);

    const title = inventoryComponentItem.getTitleName(card);
    const description = inventoryComponentItem.getDescription(card);
    const price = inventoryComponentItem.getPrice(card);
    const button = inventoryComponentItem.getButton(card);

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
    const card = inventoryComponentItem.getProductCard(product.name);
    const button = inventoryComponentItem.getButton(card);
    await expect(button).toHaveText(/Add to cart/i);
    await button.click();
    await expect(button).toHaveText(/Remove/i);
});
test('Check if the user pressed the "ADD TO CART" button twice', async ({
    inventoryComponentItem,
}) => {
    const product = productsData.products[0];
    const card = inventoryComponentItem.getProductCard(product.name);
    const button = inventoryComponentItem.getButton(card);
    await expect(button).toHaveText(/Add to cart/i);
    await button.dblclick();
    await expect(button).toHaveText(/Add to cart/i);
});
