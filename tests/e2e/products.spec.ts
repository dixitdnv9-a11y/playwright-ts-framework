import { test, expect } from '../../src/fixtures/test-fixtures';
import { UserFactory } from '../../src/data/user.factory';

/**
 * Products & Cart Module - TC07 to TC13, TC17-TC22
 * Enterprise: No waitForTimeout, safeClick with evaluate fallback,
 * attached state for accordion, cartModal fixture for modals
 */

test.describe('Products & Cart Flow @regression', () => {

  test('TC07 @smoke - Verify Test Cases Page', async ({ page, homePage, testCasesPage }) => {
    await homePage.goto();
    await homePage.testCasesLink.click();
    await expect(page).toHaveURL(/.*test_cases/);
    await testCasesPage.verifyVisible();
  });

  test('TC08 @smoke - All Products and product detail', async ({ page, homePage, productsPage, productDetailPage }) => {
    await homePage.goto();
    await homePage.goToProducts();
    await expect(page.locator('h2.title:has-text("All Products")')).toBeVisible();
    expect(await productsPage.getProductCount()).toBeGreaterThan(0);
    await productsPage.viewProductByIndex(0);
    await expect(page).toHaveURL(/.*product_details\/\d+/);
    await productDetailPage.verifyProductDetailsVisible();
  });

  test('TC09 - Search Product', async ({ page, productsPage }) => {
    await productsPage.goto();
    await productsPage.searchProduct('Top');
    await expect(page.locator('h2.title:has-text("Searched Products")')).toBeVisible();
    expect(await productsPage.getProductCount()).toBeGreaterThan(0);
  });

  test('TC10 - Subscription in home page', async ({ homePage }) => {
    await homePage.goto();
    await homePage.verifySubscriptionVisible();
    await homePage.subscribe(`sub_${Date.now()}@example.com`);
    await homePage.verifySubscriptionSuccess();
  });

  test('TC11 - Subscription in Cart page', async ({ cartPage }) => {
    await cartPage.goto();
    await cartPage.subscribe(`sub_cart_${Date.now()}@example.com`);
    await cartPage.verifySubscriptionSuccess();
  });

  test('TC12 - Add Products in Cart', async ({ productsPage, cartPage, cartModal }) => {
    await productsPage.goto();
    await productsPage.addToCartByIndex(0);
    await cartModal.verifyAdded();
    await cartModal.continueShopping();
    await productsPage.addToCartByIndex(1);
    await cartModal.verifyAdded();
    await cartModal.viewCart();
    await cartPage.verifyNotEmpty();
    expect(await cartPage.cartRows.count()).toBe(2);
  });

  test('TC13 - Verify Product quantity in Cart', async ({ productsPage, productDetailPage, cartPage, cartModal }) => {
    await productsPage.goto();
    await productsPage.viewProductByIndex(0);
    await productDetailPage.setQuantity(4);
    await productDetailPage.addToCart();
    await cartModal.viewCart();
    await cartPage.verifyNotEmpty();
    expect(await cartPage.getQuantityForFirstProduct()).toBe('4');
  });

  test('TC17 - Remove Products From Cart', async ({ productsPage, cartPage, cartModal }) => {
    await productsPage.goto();
    await productsPage.addToCartByIndex(0);
    await cartModal.viewCart();
    await cartPage.verifyNotEmpty();
    await cartPage.removeProductByIndex(0);
    await cartPage.verifyEmpty();
  });

  test('TC18 - View Category Products', async ({ page, homePage }) => {
    await homePage.goto();
    const womenCat = page.locator('a[data-toggle="collapse"][href="#Women"]').first();
    await womenCat.click();
    const dressLink = page.locator('#Women a:has-text("Dress")').first();
    await dressLink.waitFor({ state: 'attached', timeout: 10000 });
    await dressLink.evaluate((el: HTMLElement) => el.click());
    await expect(page.locator('h2.title:has-text("Women - Dress Products")')).toBeVisible({ timeout: 15000 });

    await page.goto('/');
    const menCat = page.locator('a[data-toggle="collapse"][href="#Men"]').first();
    await menCat.click({ force: true });
    const tshirtLink = page.locator('#Men a:has-text("Tshirts")').first();
    await tshirtLink.waitFor({ state: 'attached', timeout: 10000 });
    await tshirtLink.evaluate((el: HTMLElement) => el.click());
    await expect(page.locator('h2.title:has-text("Men - Tshirts Products")')).toBeVisible({ timeout: 15000 });
  });

  test('TC19 - View & Cart Brand Products', async ({ page, productsPage }) => {
    await productsPage.goto();
    await page.locator('.brands-name a:has-text("Polo")').first().click();
    await expect(page.locator('h2.title:has-text("Brand - Polo Products")')).toBeVisible({ timeout: 15000 });
    await page.locator('.brands-name a:has-text("H&M")').first().click();
    await expect(page.locator('h2.title:has-text("Brand - H&M Products")')).toBeVisible({ timeout: 15000 });
  });

  test('TC20 - Search and Verify Cart After Login', async ({ page, productsPage, cartPage, cartModal, loginPage, signupPage, header }) => {
    test.setTimeout(120000);
    const userData = UserFactory.create('prod20');
    await productsPage.goto();
    await productsPage.searchProduct('Top');
    const count = await productsPage.getProductCount();
    for (let i = 0; i < Math.min(count, 2); i++) {
      await productsPage.addToCartByIndex(i);
      await cartModal.continueShopping();
    }
    await page.goto('/view_cart');
    await cartPage.verifyNotEmpty();

    await loginPage.goto();
    await loginPage.signup(userData.name, userData.email);
    await signupPage.fillAccountDetails(userData);
    await signupPage.fillAddressDetails(userData);
    await signupPage.submit();
    await expect(page.getByText('Account Created!')).toBeVisible({ timeout: 20000 });
    await page.getByRole('link', { name: /continue/i }).click();
    await page.goto('/view_cart');
    await cartPage.verifyNotEmpty();
    await header.deleteAccountLink.click();
    await expect(page.getByText('Account Deleted!')).toBeVisible({ timeout: 15000 });
  });

  test('TC21 - Add review on product', async ({ page, productsPage, productDetailPage }) => {
    await productsPage.goto();
    await productsPage.viewProductByIndex(0);
    await expect(page.locator('a:has-text("Write Your Review")')).toBeVisible();
    await productDetailPage.addReview('Test User', 'test@example.com', 'Great product! TC21');
    await productDetailPage.verifyReviewSuccess();
  });

  test('TC22 - Add to cart from Recommended items', async ({ homePage, cartPage, cartModal, page }) => {
    await homePage.goto();
    const recSection = page.locator('.recommended_items');
    await recSection.scrollIntoViewIfNeeded();
    await recSection.locator('a.add-to-cart').first().evaluate((el: HTMLElement) => el.click());
    await cartModal.verifyAdded();
    await cartModal.viewCart();
    await cartPage.verifyNotEmpty();
  });
});
