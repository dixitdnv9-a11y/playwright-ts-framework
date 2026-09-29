import { test, expect } from '../../src/fixtures/test-fixtures';

function generateUserData() {
  const rand = Math.floor(Math.random() * 100000);
  return {
    name: `TestUser${rand}`,
    email: `test_auth_${rand}@example.com`,
    password: 'Test@12345',
    firstName: 'Test',
    lastName: 'User',
    company: 'Test Co',
    address: '123 Test Street',
    country: 'India',
    state: 'Karnataka',
    city: 'Bangalore',
    zipcode: '560001',
    mobile: '9876543210'
  };
}

test.describe.serial('Authentication Flow - TC01 to TC04 (Single User Lifecycle)', () => {
  const userData = generateUserData();

  test('TC01 - Register User', async ({ page, homePage, loginPage, signupPage, header }) => {
    // 1-3. Launch + verify home
    await homePage.goto();
    await expect(page).toHaveTitle(/Automation Exercise/);

    // 4-7. Signup
    await loginPage.goto();
    await expect(page.locator('h2:has-text("New User Signup!")')).toBeVisible();
    await loginPage.signup(userData.name, userData.email);

    // 8-13. Fill details
    await expect(page.locator('text=ENTER ACCOUNT INFORMATION')).toBeVisible({ timeout: 15000 });
    await signupPage.fillAccountDetails(userData);
    await signupPage.fillAddressDetails(userData);
    await signupPage.submit();

    // 14-16. Verify created + logged in
    await expect(page.getByText('Account Created!')).toBeVisible({ timeout: 20000 });
    await page.getByRole('link', { name: /continue/i }).click();
    await header.verifyLoggedIn(userData.name);
    // NOTE: No delete here - per your plan
  });

  test('TC02 - Login User with correct email and password', async ({ page, homePage, loginPage, header }) => {
    // Ensure logged out first (from TC01)
    await homePage.goto();
    try {
      if (await header.logoutLink.isVisible({ timeout: 3000 })) {
        await header.logoutLink.click();
      }
    } catch {}

    await loginPage.goto();
    await expect(page.locator('h2:has-text("Login to your account")')).toBeVisible();

    await loginPage.login(userData.email, userData.password);
    await header.verifyLoggedIn(userData.name);
  });

  test('TC04 - Logout User', async ({ page, homePage, loginPage, header }) => {
    // TC04 is tested before TC03 to keep session valid
    await homePage.goto();
    await header.verifyLoggedIn(userData.name);
    
    await header.logoutLink.click();
    await expect(page).toHaveURL(/.*\/login/);
    await expect(page.locator('h2:has-text("Login to your account")')).toBeVisible();
  });

  test('TC03 - Login User with incorrect email and password', async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.login('wrong_email@example.com', 'wrongpassword');

    const error = page.locator('p').filter({ hasText: /incorrect/i }).first();
    await expect(error).toBeVisible({ timeout: 10000 });
    await expect(error).toContainText(/email or password is incorrect/i);
  });

  test('TC05-like Cleanup - Login again and Delete Account (after TC01-TC04 passed)', async ({ page, loginPage, header }) => {
    // Re-login with correct credentials for cleanup
    await loginPage.goto();
    await loginPage.login(userData.email, userData.password);
    await header.verifyLoggedIn(userData.name);

    // Delete - this was originally in TC01 but moved to end per your plan
    await header.deleteAccountLink.click();
    await expect(page.getByText('Account Deleted!')).toBeVisible({ timeout: 15000 });
    await page.getByRole('link', { name: /continue/i }).click();
  });
});
