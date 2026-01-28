import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';
import productsData from '../data/products.json';

test.beforeEach(async ({ pages, loginStandardUser }) => {
    const { inventoryPage } = pages;
    await loginStandardUser;
    await inventoryPage.assertOnInventoryPage();
});

test(`Inventory page displays`, async ({ pages, loginStandardUser }) => {
    const { inventoryPage } = pages;
    await loginStandardUser;
    await inventoryPage.assertProductsCount(6);
});

test('Product name is clickable', async ({ page, pages }) => {
    const { inventoryPage } = pages;
    const product = productsData.products[0];
    const item = inventoryPage.getProduct(product.name);

    await item.getTitle().click();
    await expect(page).toHaveURL(/inventory-item\.html/);
});

test('Check product card structure and text content', async ({ pages }) => {
    const { inventoryPage } = pages;
    const product = productsData.products[0];
    const item = inventoryPage.getProduct(product.name);

    await expect(item.getTitle()).toBeVisible();
    await expect(item.getDescription()).toBeVisible();
    await expect(item.getButton()).toBeVisible();

    await expect(item.getTitle()).toHaveText(product.name);
    await expect(item.getDescription()).toContainText(product.description);
    await expect(item.getButton()).toHaveText(/Add to cart/i);
    expect(await item.getPrice()).toBe(Number(product.price.replace('$', '')));
});

test('Check the button change to "REMOVE"', async ({ pages }) => {
    const { inventoryPage } = pages;
    const product = productsData.products[0];
    const item = inventoryPage.getProduct(product.name);

    await expect(item.getButton()).toHaveText(/Add to cart/i);
    await item.addToCart();
    await expect(item.getButton()).toHaveText(/Remove/i);
});
test('Check if the user pressed the "ADD TO CART" button twice', async ({ pages }) => {
    const { inventoryPage } = pages;
    const product = productsData.products[0];
    const item = inventoryPage.getProduct(product.name);

    await expect(item.getButton()).toHaveText(/Add to cart/i);
    await item.getButton().dblclick();
    await expect(item.getButton()).toHaveText(/Add to cart/i);
});
