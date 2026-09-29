# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\ui.spec.ts >> Scroll & UI @regression >> TC25 - Verify Scroll Up using Arrow button and Scroll Down
- Location: tests\e2e\ui.spec.ts:4:7

# Error details

```
Error: expect(locator).toBeHidden() failed

Locator:  locator('h2:has-text("Subscription")')
Expected: hidden
Received: visible
Timeout:  20000ms

Call log:
  - Expect "toBeHidden" locator('h2:has-text("Subscription")') with timeout 20000ms
  - waiting for locator('h2:has-text("Subscription")')
    43 × locator resolved to <h2>Subscription</h2>
       - unexpected value "visible"

```

```yaml
- heading "Subscription" [level=2]
```

# Test source

```ts
  1  | import { test, expect } from '../../src/fixtures/test-fixtures';
  2  | 
  3  | test.describe('Scroll & UI @regression', () => {
  4  |   test('TC25 - Verify Scroll Up using Arrow button and Scroll Down', async ({ page, homePage }) => {
  5  |     await homePage.goto();
> 6  |     await expect(page.locator('h2:has-text("Subscription")')).toBeHidden();
     |                                                               ^ Error: expect(locator).toBeHidden() failed
  7  |     
  8  |     // Scroll down
  9  |     await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  10 |     await expect(homePage.subscriptionText).toBeVisible({ timeout: 10000 });
  11 |     
  12 |     // Scroll up via arrow button
  13 |     const arrowBtn = page.locator('#scrollUp');
  14 |     await arrowBtn.waitFor({ state: 'visible', timeout: 10000 });
  15 |     await arrowBtn.click();
  16 |     
  17 |     await expect(page.locator('.carousel-inner').first()).toBeVisible({ timeout: 10000 });
  18 |   });
  19 | 
  20 |   test('TC26 - Verify Scroll Up without Arrow button', async ({ page, homePage }) => {
  21 |     await homePage.goto();
  22 |     await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  23 |     await expect(homePage.subscriptionText).toBeVisible({ timeout: 10000 });
  24 |     
  25 |     // Scroll up without arrow - via JS
  26 |     await page.evaluate(() => window.scrollTo(0, 0));
  27 |     await expect(page.locator('.carousel-inner').first()).toBeVisible({ timeout: 10000 });
  28 |   });
  29 | });
  30 | 
```