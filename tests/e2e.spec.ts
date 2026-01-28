import { test } from '../fixtures/fixtures';
import { completePurchase } from '../helpers/purcaseHelper';

test('Successful purchase', async ({ pages, loginStandardUser }) => {
    await loginStandardUser;

    await completePurchase(pages, {
        firstName: 'Nata',
        lastName: 'Test',
        postalCode: '12345',
    });
});
