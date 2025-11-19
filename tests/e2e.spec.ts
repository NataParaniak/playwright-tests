// import { test } from '@playwright/test';
// import LoginPage from '../pages/LoginPage';
// import InventoryPage from '../pages/InventoryPage';
// import CartPage from '../pages/CartPage';
// import CheckoutPage from '../pages/CheckOutPage';
// import CheckOutOverviewPage from '../pages/CheckOutOverview';
// import SuccessfullOrderPage from '../pages/SuccessfullOrderPage';
// // import HeaderPage from '../pages/HeaderPage';
// import users from '../data/users.json';
// import adress from '../data/adress.json';

// test.describe('Sausdemo e2e', async () => {
//     test('Successful purchase', async ({ page }) => {
//         const loginPage = new LoginPage(page);
//         const inventoryPage = new InventoryPage(page);
//         const cartPage = new CartPage(page);
//         const checkoutPage = new CheckoutPage(page);
//         const checkoutoverviewPage = new CheckOutOverviewPage(page);
//         const successfullorderPage = new SuccessfullOrderPage(page);

//         await loginPage.navigate();
//         await loginPage.login(users.standardUser.username, users.standardUser.password);
//         await inventoryPage.assertOnInventoryPage();

//         await cartPage.clickCheckout();
//         await checkoutPage.fillData(
//             adress.standardUser.username,
//             adress.standardUser.surname,
//             adress.standardUser.postalcode,
//         );
//         await checkoutoverviewPage.сlickFinishButton();
//         await successfullorderPage.verifySuccessfullMessageVisible();
//     });
// });
