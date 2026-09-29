import { test, expect } from '../../src/fixtures/test-fixtures';
import { UserFactory } from '../../src/data/user.factory';

/**
 * Order Flow - TC14, TC15, TC16, TC23, TC24
 * Enterprise: Uses UserFactory, BasePage safeClick, no hard waits
 */

test.describe('Order Flow @regression', () => {

  test('TC14 @smoke - Place Order: Register while Checkout', async ({ page, productsPage, cartPage, cartModal, loginPage, signupPage, header, checkoutPage, paymentPage, orderPlacedPage, homePage }) => {
    test.setTimeout(120000);
    const user = UserFactory.create('tc14');
    await homePage.goto();
    await productsPage.goto();
    await productsPage.addToCartByIndex(0);
    await cartModal.verifyAdded();
    await cartModal.viewCart();
    await cartPage.verifyNotEmpty();
    await cartPage.proceedToCheckout();
    await cartPage.clickRegisterLogin();

    await loginPage.signup(user.name, user.email);
    await signupPage.fillAccountDetails(user);
    await signupPage.fillAddressDetails(user);
    await signupPage.submit();
    await expect(page.getByText('Account Created!')).toBeVisible({ timeout: 20000 });
    await page.getByRole('link', { name: /continue/i }).click();
    await header.verifyLoggedIn(user.name);

    await header.cartLink.click();
    await cartPage.proceedToCheckout();
    await checkoutPage.verifyAddressVisible();
    await checkoutPage.addComment('TC14 order');
    await checkoutPage.placeOrder();
    await paymentPage.fillPaymentDetails({ nameOnCard: `${user.firstName} ${user.lastName}`, cardNumber: '4111111111111111', cvc: '123', month: '12', year: '2030' });
    await paymentPage.payAndConfirm();
    await orderPlacedPage.verifyOrderPlaced();
    await header.deleteAccountLink.click();
    await expect(page.getByText('Account Deleted!')).toBeVisible({ timeout: 15000 });
  });

  test('TC15 - Place Order: Register before Checkout', async ({ page, productsPage, cartPage, cartModal, loginPage, signupPage, header, checkoutPage, paymentPage, orderPlacedPage }) => {
    test.setTimeout(120000);
    const user = UserFactory.create('tc15');
    await loginPage.goto();
    await loginPage.signup(user.name, user.email);
    await signupPage.fillAccountDetails(user);
    await signupPage.fillAddressDetails(user);
    await signupPage.submit();
    await expect(page.getByText('Account Created!')).toBeVisible({ timeout: 20000 });
    await page.getByRole('link', { name: /continue/i }).click();

    await productsPage.goto();
    await productsPage.addToCartByIndex(0);
    await cartModal.verifyAdded();
    await cartModal.viewCart();
    await cartPage.verifyNotEmpty();
    await cartPage.proceedToCheckout();
    await checkoutPage.verifyAddressVisible();
    await checkoutPage.placeOrder();
    await paymentPage.fillPaymentDetails({ nameOnCard: `${user.firstName} ${user.lastName}`, cardNumber: '4111111111111111', cvc: '123', month: '12', year: '2030' });
    await paymentPage.payAndConfirm();
    await orderPlacedPage.verifyOrderPlaced();
    await header.deleteAccountLink.click();
    await expect(page.getByText('Account Deleted!')).toBeVisible({ timeout: 15000 });
  });

  test('TC16 - Place Order: Login before Checkout', async ({ page, productsPage, cartPage, cartModal, loginPage, signupPage, header, checkoutPage, paymentPage, orderPlacedPage }) => {
    test.setTimeout(120000);
    const user = UserFactory.create('tc16');
    // Create account first via UI (enterprise would use API)
    await loginPage.goto();
    await loginPage.signup(user.name, user.email);
    await signupPage.fillAccountDetails(user);
    await signupPage.fillAddressDetails(user);
    await signupPage.submit();
    await expect(page.getByText('Account Created!')).toBeVisible({ timeout: 20000 });
    await page.getByRole('link', { name: /continue/i }).click();
    await header.logoutLink.click();

    await loginPage.goto();
    await loginPage.login(user.email, user.password);
    await productsPage.goto();
    await productsPage.addToCartByIndex(0);
    await cartModal.verifyAdded();
    await cartModal.viewCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.verifyAddressVisible();
    await checkoutPage.placeOrder();
    await paymentPage.fillPaymentDetails({ nameOnCard: `${user.firstName} ${user.lastName}`, cardNumber: '4111111111111111', cvc: '123', month: '12', year: '2030' });
    await paymentPage.payAndConfirm();
    await orderPlacedPage.verifyOrderPlaced();
    await header.deleteAccountLink.click();
    await expect(page.getByText('Account Deleted!')).toBeVisible({ timeout: 15000 });
  });

  test('TC23 - Verify address details in checkout', async ({ page, productsPage, cartPage, cartModal, loginPage, signupPage, header, checkoutPage }) => {
    test.setTimeout(120000);
    const user = UserFactory.create('tc23');
    await loginPage.goto();
    await loginPage.signup(user.name, user.email);
    await signupPage.fillAccountDetails(user);
    await signupPage.fillAddressDetails(user);
    await signupPage.submit();
    await expect(page.getByText('Account Created!')).toBeVisible({ timeout: 20000 });
    await page.getByRole('link', { name: /continue/i }).click();

    await productsPage.goto();
    await productsPage.addToCartByIndex(0);
    await cartModal.viewCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.verifyAddressVisible();
    
    // Verify delivery address matches user data
    const deliveryText = await page.locator('#address_delivery').textContent();
    expect(deliveryText).toContain(user.firstName);
    expect(deliveryText).toContain(user.address);

    await header.deleteAccountLink.click();
    await expect(page.getByText('Account Deleted!')).toBeVisible({ timeout: 15000 });
  });

  test('TC24 - Download Invoice after purchase', async ({ page, productsPage, cartPage, cartModal, loginPage, signupPage, header, checkoutPage, paymentPage, orderPlacedPage }) => {
    test.setTimeout(120000);
    const user = UserFactory.create('tc24');
    await productsPage.goto();
    await productsPage.addToCartByIndex(0);
    await cartModal.viewCart();
    await cartPage.proceedToCheckout();
    await cartPage.clickRegisterLogin();
    await loginPage.signup(user.name, user.email);
    await signupPage.fillAccountDetails(user);
    await signupPage.fillAddressDetails(user);
    await signupPage.submit();
    await expect(page.getByText('Account Created!')).toBeVisible({ timeout: 20000 });
    await page.getByRole('link', { name: /continue/i }).click();
    await header.cartLink.click();
    await cartPage.proceedToCheckout();
    await checkoutPage.placeOrder();
    await paymentPage.fillPaymentDetails({ nameOnCard: `${user.firstName} ${user.lastName}`, cardNumber: '4111111111111111', cvc: '123', month: '12', year: '2030' });
    await paymentPage.payAndConfirm();
    await orderPlacedPage.verifyOrderPlaced();
    
    const download = await orderPlacedPage.downloadInvoice();
    expect(download.suggestedFilename()).toContain('invoice');

    await header.deleteAccountLink.click();
    await expect(page.getByText('Account Deleted!')).toBeVisible({ timeout: 15000 });
  });
});
