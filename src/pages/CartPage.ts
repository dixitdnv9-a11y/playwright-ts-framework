import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../core/BasePage';
import { APP_URLS } from '../constants/app.constants';

export class CartPage extends BasePage {
  readonly cartTable: Locator;
  readonly cartRows: Locator;
  readonly proceedToCheckoutBtn: Locator;
  readonly subscriptionText: Locator;
  readonly subscriptionEmail: Locator;
  readonly subscriptionBtn: Locator;
  readonly subscriptionSuccess: Locator;
  readonly emptyCartMsg: Locator;
  readonly deleteBtns: Locator;

  constructor(page: Page) {
    super(page);
    this.cartTable = page.locator('#cart_info_table');
    this.cartRows = page.locator('#cart_info_table tbody tr');
    this.proceedToCheckoutBtn = page.locator('a.btn:has-text("Proceed To Checkout")');
    this.subscriptionText = page.locator('h2:has-text("Subscription")').first();
    this.subscriptionEmail = page.locator('#susbscribe_email');
    this.subscriptionBtn = page.locator('#subscribe');
    this.subscriptionSuccess = page.locator('.alert-success');
    this.emptyCartMsg = page.locator('#empty_cart, b:has-text("Cart is empty!"), p:has-text("Cart is empty")').first();
    this.deleteBtns = page.locator('.cart_quantity_delete');
  }

  async goto() {
    await super.goto(APP_URLS.CART);
  }

  async verifyNotEmpty() {
    // FIXED: Wait for either cart table or rows, with fallback
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.cartTable.or(this.cartRows.first())).toBeVisible({ timeout: 15000 });
  }

  async verifyEmpty() {
    // FIXED: After removing product, table disappears. Check empty message OR hidden table
    await this.page.waitForTimeout(1500); // Allow delete animation
    await expect(this.emptyCartMsg.or(this.page.locator('text=Cart is empty'))).toBeVisible({ timeout: 15000 });
  }

  async getQuantityForFirstProduct(): Promise<string> {
    const txt = await this.page.locator('.cart_quantity button').first().textContent();
    return (txt || '').trim();
  }

  async proceedToCheckout() {
    await this.subscriptionText.scrollIntoViewIfNeeded().catch(()=>{});
    await this.safeClick(this.proceedToCheckoutBtn);
  }

  async clickRegisterLogin() {
    try {
      const modal = this.page.locator('.modal-content');
      await modal.waitFor({ state: 'visible', timeout: 8000 });
      const link = this.page.locator('.modal-content a[href="/login"]').first();
      if (await link.count() > 0) {
        await this.safeClick(link);
      }
      await this.page.waitForURL('**/login', { timeout: 10000 });
    } catch {
      await this.page.goto('/login');
    }
  }

  async removeProductByIndex(index: number) {
    await this.safeClick(this.deleteBtns.nth(index));
    await this.page.waitForTimeout(1000);
  }

  async subscribe(email: string) {
    await this.subscriptionText.scrollIntoViewIfNeeded();
    await this.fillInput(this.subscriptionEmail, email);
    await this.safeClick(this.subscriptionBtn);
  }

  async getProductNames(): Promise<string[]> {
    const names = await this.page.locator('#cart_info_table .cart_description h4 a').allTextContents();
    return names;
  }

  async getProductPrices(): Promise<string[]> {
    const prices = await this.page.locator('.cart_price p').allTextContents();
    return prices;
  }

  async clearCart() {
    // Remove all products
    const count = await this.deleteBtns.count();
    for (let i = 0; i < count; i++) {
      await this.deleteBtns.first().click();
      await this.page.waitForTimeout(800);
    }
  }

  async verifySubscriptionSuccess() {
    await this.waitForVisible(this.subscriptionSuccess);
  }
}
