# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\order.spec.ts >> Order Flow @regression >> TC24 - Download Invoice after purchase
- Location: tests\e2e\order.spec.ts:124:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('a.btn:has-text("Proceed To Checkout")')

```

# Page snapshot

```yaml
- generic [active] [ref=f1e1]:
  - banner [ref=f1e2]:
    - generic [ref=f1e5]:
      - link [ref=f1e8] [cursor=pointer]:
        - /url: /
        - img "Website for automation practice" [ref=f1e9]
      - list [ref=f1e12]:
        - listitem [ref=f1e13]:
          - link " Home" [ref=f1e14] [cursor=pointer]:
            - /url: /
            - generic [ref=f1e15]: 
            - text: Home
        - listitem [ref=f1e16]:
          - link " Products" [ref=f1e17] [cursor=pointer]:
            - /url: /products
            - generic [ref=f1e18]: 
            - text: Products
        - listitem [ref=f1e19]:
          - link " Cart" [ref=f1e20] [cursor=pointer]:
            - /url: /view_cart
            - generic [ref=f1e21]: 
            - text: Cart
        - listitem [ref=f1e22]:
          - link " Signup / Login" [ref=f1e23] [cursor=pointer]:
            - /url: /login
            - generic [ref=f1e24]: 
            - text: Signup / Login
        - listitem [ref=f1e25]:
          - link " Test Cases" [ref=f1e26] [cursor=pointer]:
            - /url: /test_cases
            - generic [ref=f1e27]: 
            - text: Test Cases
        - listitem [ref=f1e28]:
          - link " API Testing" [ref=f1e29] [cursor=pointer]:
            - /url: /api_list
            - generic [ref=f1e30]: 
            - text: API Testing
        - listitem [ref=f1e31]:
          - link " Video Tutorials" [ref=f1e32] [cursor=pointer]:
            - /url: https://www.youtube.com/c/AutomationExercise
            - generic [ref=f1e33]: 
            - text: Video Tutorials
        - listitem [ref=f1e34]:
          - link " Contact us" [ref=f1e35] [cursor=pointer]:
            - /url: /contact_us
            - generic [ref=f1e36]: 
            - text: Contact us
  - generic [ref=f1e38]:
    - list [ref=f1e40]:
      - listitem [ref=f1e41]:
        - link "Home" [ref=f1e42] [cursor=pointer]:
          - /url: /
      - listitem [ref=f1e43]: Shopping Cart
    - paragraph [ref=f1e46]:
      - text: Cart is empty! Click
      - link "here" [ref=f1e47] [cursor=pointer]:
        - /url: /products
      - text: to buy products.
  - contentinfo [ref=f1e48]:
    - generic [ref=f1e53]:
      - heading "Subscription" [level=2] [ref=f1e54]
      - generic [ref=f1e55]:
        - textbox "Your email address" [ref=f1e56]
        - button "" [ref=f1e57] [cursor=pointer]
        - paragraph [ref=f1e59]: Get the most recent updates from our site and be updated your self...
    - paragraph [ref=f1e63]: Copyright © 2021 All rights reserved
  - text: 
```

# Test source

```ts
  1  | import { Page, Locator, expect, test } from '@playwright/test';
  2  | import { Logger } from '../utils/logger';
  3  | 
  4  | export abstract class BasePage {
  5  |   readonly page: Page;
  6  |   readonly logger: Logger;
  7  | 
  8  |   constructor(page: Page) {
  9  |     this.page = page;
  10 |     this.logger = new Logger(this.constructor.name);
  11 |   }
  12 | 
  13 |   async goto(path: string = '/') {
  14 |     await test.step(`Navigate to ${path}`, async () => {
  15 |       await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  16 |       await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  17 |     });
  18 |   }
  19 | 
  20 |   async waitForVisible(locator: Locator, timeout = 15000) {
  21 |     await expect(locator).toBeVisible({ timeout });
  22 |   }
  23 | 
  24 |   async safeClick(locator: Locator, options: { force?: boolean; timeout?: number } = {}) {
  25 |     await test.step(`Click ${locator}`, async () => {
> 26 |       await locator.waitFor({ state: 'attached', timeout: options.timeout || 10000 });
     |                     ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  27 |       await locator.scrollIntoViewIfNeeded().catch(() => {});
  28 |       if (options.force) {
  29 |         await locator.evaluate((el: HTMLElement) => el.click());
  30 |       } else {
  31 |         await locator.click({ timeout: options.timeout || 10000 }).catch(async () => {
  32 |           await locator.evaluate((el: HTMLElement) => el.click());
  33 |         });
  34 |       }
  35 |     });
  36 |   }
  37 | 
  38 |   async fillInput(locator: Locator, value: string) {
  39 |     await locator.waitFor({ state: 'visible', timeout: 10000 });
  40 |     await locator.clear().catch(() => {});
  41 |     await locator.fill(value);
  42 |   }
  43 | 
  44 |   protected async handleAds() {
  45 |     // Centralized ad removal - no waitForTimeout
  46 |     await this.page.evaluate(() => {
  47 |       const selectors = ['iframe[id^="aswift"]', '.adsbygoogle', '#ad', '[id*="google_ads"]'];
  48 |       selectors.forEach(sel => {
  49 |         document.querySelectorAll(sel).forEach(el => el.remove());
  50 |       });
  51 |     }).catch(() => {});
  52 |   }
  53 | }
  54 | 
```