import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';
import InventoryPage from '../pages/InventoryPage';
import productsData from '../data/products.json';
import { parsePrice } from '../utils/ParsePrice';
import { getProductByName } from '../utils/GetProductByName';
import { Products } from '../constans/products';
import { PRODUCTS_COUNT } from '../constans/productsCount';

test.beforeEach(async ({ page, loginStandardUser }) => {
    const inventoryPage = new InventoryPage(page);
    await loginStandardUser;
    await inventoryPage.assertOnInventoryPage();
});

test('Inventory page displays valid products count', async ({ page, loginStandardUser }) => {
    const inventoryPage = new InventoryPage(page);
    await loginStandardUser;

    await inventoryPage.assertProductsCount(PRODUCTS_COUNT);
});

test('Product name is clickable', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const item = inventoryPage.getProduct(Products.Backpack);

    await item.clickTitle();
    await expect(page).toHaveURL(/inventory-item\.html/);
});

test('Check product card structure and text content', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const product = getProductByName(Products.Backpack);
    const item = inventoryPage.getProduct(Products.Backpack);

    await expect(item.getTitle(), 'Product title should be visible').toBeVisible();
    await expect(item.getDescription(), 'Product description should be visible').toBeVisible();
    await expect(item.getButton(), 'Add to cart button should be visible').toBeVisible();

    await expect(item.getTitle(), 'Product title text should match product name').toHaveText(
        product.name,
    );
    await expect(
        item.getDescription(),
        'Product description should contain correct text',
    ).toContainText(product.description);
    await expect(item.getButton(), 'Button text should be "Add to cart"').toHaveText(
        /Add to cart/i,
    );
    expect(await item.getPriceValue(), 'Product price should match expected value').toBe(
        parsePrice(product.price),
    );
});

test('Check the button change to "REMOVE"', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const product = productsData.products[0];
    const item = inventoryPage.getProduct(product.name);

    await expect(item.getButton(), 'Initial button text should be "Add to cart"').toHaveText(
        /Add to cart/i,
    );
    await item.addToCart();
    await expect(
        item.getButton(),
        'Button text should change to "Remove" after adding product to cart',
    ).toHaveText(/Remove/i);
});
test('Check if the user pressed the "ADD TO CART" button twice', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const product = productsData.products[0];
    const item = inventoryPage.getProduct(product.name);

    await expect(item.getButton(), 'Initial button text should be "Add to cart"').toHaveText(
        /Add to cart/i,
    );
    await item.getButton().dblclick();
    await expect(
        item.getButton(),
        "After doubleclick initial button text should be 'Add to cart'",
    ).toHaveText(/Add to cart/i);
});
