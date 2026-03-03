import { test } from '../fixtures/fixtures';
import { completePurchase } from '../helpers/purcaseHelper';
import SuccessfullOrderPage from '../pages/SuccessfullOrderPage';

test('Successful purchase', async ({ page, loginStandardUser }) => {
    await loginStandardUser;

    const successfullOrderPage = new SuccessfullOrderPage(page);
    await completePurchase(page, {
        firstName: 'Nata',
        lastName: 'Test',
        postalCode: '12345',
    });

    await successfullOrderPage.verifySuccessfullMessageVisible();
});
