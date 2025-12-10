import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';

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
    const productName = 'Sauce Labs Backpack';
    const card = inventoryComponentItem.getProductCard(productName);
    const title = inventoryComponentItem.getTitleName(card);
    await title.click();
    await expect(page).toHaveURL(/inventory-item\.html/);
});

test('Check product card structure and text content', async ({ inventoryComponentItem }) => {
    const productName = 'Sauce Labs Backpack';
    const card = inventoryComponentItem.getProductCard(productName);
    await expect(card).toHaveCount(1);

    const title = inventoryComponentItem.getTitleName(card);
    const description = inventoryComponentItem.getDescription(card);
    const price = inventoryComponentItem.getPrice(card);
    const button = inventoryComponentItem.getButton(card);

    await expect(title).toBeVisible();
    await expect(description).toBeVisible();
    await expect(price).toBeVisible();
    await expect(button).toBeVisible();

    await expect(title).toHaveText(productName);
    await expect(description).toContainText('carry.allTheThings()');
    await expect(price).toHaveText(/^\$29\.99$/);
    await expect(button).toHaveText(/Add to cart/i);
});

test('Check the button change to "REMOVE"', async ({ inventoryComponentItem }) => {
    const productName = 'Sauce Labs Backpack';
    const card = inventoryComponentItem.getProductCard(productName);
    const button = inventoryComponentItem.getButton(card);
    await expect(button).toHaveText(/Add to cart/i);
    await button.click();
    await expect(button).toHaveText(/Remove/i);
});
