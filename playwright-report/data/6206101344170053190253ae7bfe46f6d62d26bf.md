# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\products.spec.ts >> Products & Cart Flow @regression >> TC17 - Remove Products From Cart
- Location: tests\e2e\products.spec.ts:71:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#cart_info_table').or(locator('#cart_info_table tbody tr').first())
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('#cart_info_table').or(locator('#cart_info_table tbody tr').first()) with timeout 15000ms
  - waiting for locator('#cart_info_table').or(locator('#cart_info_table tbody tr').first())

```

```yaml
- banner:
  - link "Website for automation practice":
    - /url: /
    - img "Website for automation practice"
  - list:
    - listitem:
      - link " Home":
        - /url: /
    - listitem:
      - link " Products":
        - /url: /products
    - listitem:
      - link " Cart":
        - /url: /view_cart
    - listitem:
      - link " Signup / Login":
        - /url: /login
    - listitem:
      - link " Test Cases":
        - /url: /test_cases
    - listitem:
      - link " API Testing":
        - /url: /api_list
    - listitem:
      - link " Video Tutorials":
        - /url: https://www.youtube.com/c/AutomationExercise
    - listitem:
      - link " Contact us":
        - /url: /contact_us
- list:
  - listitem:
    - link "Home":
      - /url: /
  - listitem: Shopping Cart
- paragraph:
  - text: Cart is empty! Click
  - link "here":
    - /url: /products
  - text: to buy products.
- contentinfo:
  - heading "Subscription" [level=2]
  - textbox "Your email address"
  - button ""
  - paragraph: Get the most recent updates from our site and be updated your self...
  - paragraph: Copyright © 2021 All rights reserved
```

# Test source

```ts
  1   | import { Page, Locator, expect } from '@playwright/test';
  2   | import { BasePage } from '../core/BasePage';
  3   | import { APP_URLS } from '../constants/app.constants';
  4   | 
  5   | export class CartPage extends BasePage {
  6   |   readonly cartTable: Locator;
  7   |   readonly cartRows: Locator;
  8   |   readonly proceedToCheckoutBtn: Locator;
  9   |   readonly subscriptionText: Locator;
  10  |   readonly subscriptionEmail: Locator;
  11  |   readonly subscriptionBtn: Locator;
  12  |   readonly subscriptionSuccess: Locator;
  13  |   readonly emptyCartMsg: Locator;
  14  |   readonly deleteBtns: Locator;
  15  | 
  16  |   constructor(page: Page) {
  17  |     super(page);
  18  |     this.cartTable = page.locator('#cart_info_table');
  19  |     this.cartRows = page.locator('#cart_info_table tbody tr');
  20  |     this.proceedToCheckoutBtn = page.locator('a.btn:has-text("Proceed To Checkout")');
  21  |     this.subscriptionText = page.locator('h2:has-text("Subscription")').first();
  22  |     this.subscriptionEmail = page.locator('#susbscribe_email');
  23  |     this.subscriptionBtn = page.locator('#subscribe');
  24  |     this.subscriptionSuccess = page.locator('.alert-success');
  25  |     this.emptyCartMsg = page.locator('#empty_cart, b:has-text("Cart is empty!"), p:has-text("Cart is empty")').first();
  26  |     this.deleteBtns = page.locator('.cart_quantity_delete');
  27  |   }
  28  | 
  29  |   async goto() {
  30  |     await super.goto(APP_URLS.CART);
  31  |   }
  32  | 
  33  |   async verifyNotEmpty() {
  34  |     // FIXED: Wait for either cart table or rows, with fallback
  35  |     await this.page.waitForLoadState('domcontentloaded');
> 36  |     await expect(this.cartTable.or(this.cartRows.first())).toBeVisible({ timeout: 15000 });
      |                                                            ^ Error: expect(locator).toBeVisible() failed
  37  |   }
  38  | 
  39  |   async verifyEmpty() {
  40  |     // FIXED: After removing product, table disappears. Check empty message OR hidden table
  41  |     await this.page.waitForTimeout(1500); // Allow delete animation
  42  |     await expect(this.emptyCartMsg.or(this.page.locator('text=Cart is empty'))).toBeVisible({ timeout: 15000 });
  43  |   }
  44  | 
  45  |   async getQuantityForFirstProduct(): Promise<string> {
  46  |     const txt = await this.page.locator('.cart_quantity button').first().textContent();
  47  |     return (txt || '').trim();
  48  |   }
  49  | 
  50  |   async proceedToCheckout() {
  51  |     await this.subscriptionText.scrollIntoViewIfNeeded().catch(()=>{});
  52  |     await this.safeClick(this.proceedToCheckoutBtn);
  53  |   }
  54  | 
  55  |   async clickRegisterLogin() {
  56  |     try {
  57  |       const modal = this.page.locator('.modal-content');
  58  |       await modal.waitFor({ state: 'visible', timeout: 8000 });
  59  |       const link = this.page.locator('.modal-content a[href="/login"]').first();
  60  |       if (await link.count() > 0) {
  61  |         await this.safeClick(link);
  62  |       }
  63  |       await this.page.waitForURL('**/login', { timeout: 10000 });
  64  |     } catch {
  65  |       await this.page.goto('/login');
  66  |     }
  67  |   }
  68  | 
  69  |   async removeProductByIndex(index: number) {
  70  |     await this.safeClick(this.deleteBtns.nth(index));
  71  |     await this.page.waitForTimeout(1000);
  72  |   }
  73  | 
  74  |   async subscribe(email: string) {
  75  |     await this.subscriptionText.scrollIntoViewIfNeeded();
  76  |     await this.fillInput(this.subscriptionEmail, email);
  77  |     await this.safeClick(this.subscriptionBtn);
  78  |   }
  79  | 
  80  |   async getProductNames(): Promise<string[]> {
  81  |     const names = await this.page.locator('#cart_info_table .cart_description h4 a').allTextContents();
  82  |     return names;
  83  |   }
  84  | 
  85  |   async getProductPrices(): Promise<string[]> {
  86  |     const prices = await this.page.locator('.cart_price p').allTextContents();
  87  |     return prices;
  88  |   }
  89  | 
  90  |   async clearCart() {
  91  |     // Remove all products
  92  |     const count = await this.deleteBtns.count();
  93  |     for (let i = 0; i < count; i++) {
  94  |       await this.deleteBtns.first().click();
  95  |       await this.page.waitForTimeout(800);
  96  |     }
  97  |   }
  98  | 
  99  |   async verifySubscriptionSuccess() {
  100 |     await this.waitForVisible(this.subscriptionSuccess);
  101 |   }
  102 | }
  103 | 
```