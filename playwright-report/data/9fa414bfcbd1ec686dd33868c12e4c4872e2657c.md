# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\products.spec.ts >> Products & Cart Flow @regression >> TC12 - Add Products in Cart
- Location: tests\e2e\products.spec.ts:49:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#cart_info_table').or(locator('#cart_info_table tbody tr').first())
Expected: visible
Error: strict mode violation: locator('#cart_info_table').or(locator('#cart_info_table tbody tr').first()) resolved to 2 elements:
    1) <table id="cart_info_table" class="table table-condensed">…</table> aka getByText('Item Description Price Quantity Total Blue Top Women > Tops Rs. 500 1 Rs. 500')
    2) <tr id="product-1">…</tr> aka getByRole('row', { name: 'Product Image Blue Top Women' })

Call log:
  - Expect "toBeVisible" locator('#cart_info_table').or(locator('#cart_info_table tbody tr').first()) with timeout 15000ms
  - waiting for locator('#cart_info_table').or(locator('#cart_info_table tbody tr').first())

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
    - generic [ref=f1e44]: Proceed To Checkout
    - table [ref=f1e50]:
      - rowgroup [ref=f1e51]:
        - row [ref=f1e52]:
          - cell "Item" [ref=f1e53]
          - cell "Description" [ref=f1e54]
          - cell "Price" [ref=f1e55]
          - cell "Quantity" [ref=f1e56]
          - cell "Total" [ref=f1e57]
          - cell [ref=f1e58]
      - rowgroup [ref=f1e59]:
        - row [ref=f1e60]:
          - cell [ref=f1e61]:
            - link [ref=f1e62] [cursor=pointer]:
              - /url: ""
              - img "Product Image" [ref=f1e63]
          - cell [ref=f1e64]:
            - heading [level=4] [ref=f1e65]:
              - link "Blue Top" [ref=f1e66] [cursor=pointer]:
                - /url: /product_details/1
            - paragraph [ref=f1e67]: Women > Tops
          - cell [ref=f1e68]:
            - paragraph [ref=f1e69]: Rs. 500
          - cell [ref=f1e70]:
            - button "1" [ref=f1e71] [cursor=pointer]
          - cell [ref=f1e72]:
            - paragraph [ref=f1e73]: Rs. 500
          - cell "" [ref=f1e74]
        - row [ref=f1e77]:
          - cell [ref=f1e78]:
            - link [ref=f1e79] [cursor=pointer]:
              - /url: ""
              - img "Product Image" [ref=f1e80]
          - cell [ref=f1e81]:
            - heading [level=4] [ref=f1e82]:
              - link "Men Tshirt" [ref=f1e83] [cursor=pointer]:
                - /url: /product_details/2
            - paragraph [ref=f1e84]: Men > Tshirts
          - cell [ref=f1e85]:
            - paragraph [ref=f1e86]: Rs. 400
          - cell [ref=f1e87]:
            - button "1" [ref=f1e88] [cursor=pointer]
          - cell [ref=f1e89]:
            - paragraph [ref=f1e90]: Rs. 400
          - cell "" [ref=f1e91]
  - contentinfo [ref=f1e94]:
    - generic [ref=f1e99]:
      - heading "Subscription" [level=2] [ref=f1e100]
      - generic [ref=f1e101]:
        - textbox "Your email address" [ref=f1e102]
        - button "" [ref=f1e103] [cursor=pointer]
        - paragraph [ref=f1e105]: Get the most recent updates from our site and be updated your self...
    - paragraph [ref=f1e109]: Copyright © 2021 All rights reserved
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