import { test } from '../fixtures/fixtures';

test.beforeEach(async ({ inventoryPage, loginStandardUser }) => {
    await loginStandardUser;
    await inventoryPage.assertOnInventoryPage();
});

test('The user has the ability to sort "low to high" ', async ({ inventoryPage }) => {
    await inventoryPage.selectLowToHighFromDropDown();
    await inventoryPage.verifySortingLowToHighFromDropDown();
});
test('The user has the ability to sort "high to low" ', async ({ inventoryPage }) => {
    await inventoryPage.selectHighToLowFromDropDown();
    await inventoryPage.verifySortingHighToLowFromDropDown();
});
