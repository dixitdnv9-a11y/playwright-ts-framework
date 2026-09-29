# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\order.spec.ts >> Order Flow @regression >> TC14 @smoke - Place Order: Register while Checkout
- Location: tests\e2e\order.spec.ts:11:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#cart_info_table').or(locator('#cart_info_table tbody tr').first())
Expected: visible
Error: strict mode violation: locator('#cart_info_table').or(locator('#cart_info_table tbody tr').first()) resolved to 2 elements:
    1) <table id="cart_info_table" class="table table-condensed">…</table> aka getByText('Item Description Price Quantity Total Blue Top Women > Tops Rs. 500 1 Rs.')
    2) <tr id="product-1">…</tr> aka getByRole('row', { name: 'Product Image Blue Top Women' })

Call log:
  - Expect "toBeVisible" locator('#cart_info_table').or(locator('#cart_info_table tbody tr').first()) with timeout 15000ms
  - waiting for locator('#cart_info_table').or(locator('#cart_info_table tbody tr').first())

```

# Page snapshot

```yaml
- generic [active] [ref=f2e1]:
  - banner [ref=f2e2]:
    - generic [ref=f2e5]:
      - link [ref=f2e8] [cursor=pointer]:
        - /url: /
        - img "Website for automation practice" [ref=f2e9]
      - list [ref=f2e12]:
        - listitem [ref=f2e13]:
          - link " Home" [ref=f2e14] [cursor=pointer]:
            - /url: /
            - generic [ref=f2e15]: 
            - text: Home
        - listitem [ref=f2e16]:
          - link " Products" [ref=f2e17] [cursor=pointer]:
            - /url: /products
            - generic [ref=f2e18]: 
            - text: Products
        - listitem [ref=f2e19]:
          - link " Cart" [ref=f2e20] [cursor=pointer]:
            - /url: /view_cart
            - generic [ref=f2e21]: 
            - text: Cart
        - listitem [ref=f2e22]:
          - link " Signup / Login" [ref=f2e23] [cursor=pointer]:
            - /url: /login
            - generic [ref=f2e24]: 
            - text: Signup / Login
        - listitem [ref=f2e25]:
          - link " Test Cases" [ref=f2e26] [cursor=pointer]:
            - /url: /test_cases
            - generic [ref=f2e27]: 
            - text: Test Cases
        - listitem [ref=f2e28]:
          - link " API Testing" [ref=f2e29] [cursor=pointer]:
            - /url: /api_list
            - generic [ref=f2e30]: 
            - text: API Testing
        - listitem [ref=f2e31]:
          - link " Video Tutorials" [ref=f2e32] [cursor=pointer]:
            - /url: https://www.youtube.com/c/AutomationExercise
            - generic [ref=f2e33]: 
            - text: Video Tutorials
        - listitem [ref=f2e34]:
          - link " Contact us" [ref=f2e35] [cursor=pointer]:
            - /url: /contact_us
            - generic [ref=f2e36]: 
            - text: Contact us
  - generic [ref=f2e38]:
    - list [ref=f2e40]:
      - listitem [ref=f2e41]:
        - link "Home" [ref=f2e42] [cursor=pointer]:
          - /url: /
      - listitem [ref=f2e43]: Shopping Cart
    - generic [ref=f2e44]: Proceed To Checkout
    - table [ref=f2e50]:
      - rowgroup [ref=f2e51]:
        - row [ref=f2e52]:
          - cell "Item" [ref=f2e53]
          - cell "Description" [ref=f2e54]
          - cell "Price" [ref=f2e55]
          - cell "Quantity" [ref=f2e56]
          - cell "Total" [ref=f2e57]
          - cell [ref=f2e58]
      - rowgroup [ref=f2e59]:
        - row [ref=f2e60]:
          - cell [ref=f2e61]:
            - link [ref=f2e62] [cursor=pointer]:
              - /url: ""
              - img "Product Image" [ref=f2e63]
          - cell [ref=f2e64]:
            - heading [level=4] [ref=f2e65]:
              - link "Blue Top" [ref=f2e66] [cursor=pointer]:
                - /url: /product_details/1
            - paragraph [ref=f2e67]: Women > Tops
          - cell [ref=f2e68]:
            - paragraph [ref=f2e69]: Rs. 500
          - cell [ref=f2e70]:
            - button "1" [ref=f2e71] [cursor=pointer]
          - cell [ref=f2e72]:
            - paragraph [ref=f2e73]: Rs. 500
          - cell "" [ref=f2e74]
  - contentinfo [ref=f2e77]:
    - generic [ref=f2e82]:
      - heading "Subscription" [level=2] [ref=f2e83]
      - generic [ref=f2e84]:
        - textbox "Your email address" [ref=f2e85]
        - button "" [ref=f2e86] [cursor=pointer]
        - paragraph [ref=f2e88]: Get the most recent updates from our site and be updated your self...
    - paragraph [ref=f2e92]: Copyright © 2021 All rights reserved
  - text: 
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