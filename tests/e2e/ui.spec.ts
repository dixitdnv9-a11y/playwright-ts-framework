import { test, expect } from '../../src/fixtures/test-fixtures';

test.describe('Scroll & UI @regression', () => {
  test('TC25 - Verify Scroll Up using Arrow button and Scroll Down', async ({ page, homePage }) => {
    await homePage.goto();
    await expect(page.locator('h2:has-text("Subscription")')).toBeHidden();
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(homePage.subscriptionText).toBeVisible({ timeout: 10000 });
    
    // Scroll up via arrow button
    const arrowBtn = page.locator('#scrollUp');
    await arrowBtn.waitFor({ state: 'visible', timeout: 10000 });
    await arrowBtn.click();
    
    await expect(page.locator('.carousel-inner').first()).toBeVisible({ timeout: 10000 });
  });

  test('TC26 - Verify Scroll Up without Arrow button', async ({ page, homePage }) => {
    await homePage.goto();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(homePage.subscriptionText).toBeVisible({ timeout: 10000 });
    
    // Scroll up without arrow - via JS
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page.locator('.carousel-inner').first()).toBeVisible({ timeout: 10000 });
  });
});
