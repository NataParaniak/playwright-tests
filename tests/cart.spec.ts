import { expect, test } from '../fixtures/fixtures';
import InventoryItemComponent from '../components/InventoryComponentItem';

test.beforeEach(async ({ pages, loginStandardUser }) => {
    const { inventoryPage } = pages;
    await loginStandardUser;
    await inventoryPage.assertOnInventoryPage();
});

test('User can add multiple items to cart and cart counter updates correctly', async ({
    pages,
}) => {
    const { headerPage } = pages;

    const container = pages.inventoryPage.inventoryList;
    const product = new InventoryItemComponent(container);

    await product.clickFirstButton();
    await headerPage.assertCartIconVisible();
    await headerPage.assertCartHasItemCount(1);
    await expect(headerPage.cartImage).toBeVisible();

    await product.clickSecondButton();
    await headerPage.assertCartHasItemCount(2);
});
