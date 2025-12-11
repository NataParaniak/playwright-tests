import { test } from '../fixtures/fixtures';

test.beforeEach(async ({ inventoryPage, loginStandardUser }) => {
    await loginStandardUser;
    await inventoryPage.assertOnInventoryPage();
});

test('The user has the ability to sort ', async ({ inventoryPage }) => {
    await inventoryPage.selectLowToHighFromDropDown();
    await inventoryPage.verifySortingLowToHighFromDropDown();
});
