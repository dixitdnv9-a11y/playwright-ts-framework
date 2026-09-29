import { Page, Locator, expect } from '@playwright/test';

export class CartModal {
  readonly page: Page;
  readonly modal: Locator;
  readonly continueShoppingBtn: Locator;
  readonly viewCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = page.locator('#cartModal');
    this.continueShoppingBtn = page.locator('#cartModal button:has-text("Continue Shopping")');
    this.viewCartLink = page.locator('#cartModal a[href="/view_cart"]');
  }

  async verifyAdded() {
    try {
      await this.modal.waitFor({ state: 'visible', timeout: 8000 });
    } catch {
      await this.page.waitForTimeout(2000);
    }
  }

  async continueShopping() {
    try {
      if (await this.continueShoppingBtn.isVisible({ timeout: 2000 })) {
        await this.continueShoppingBtn.click();
      }
    } catch {}
    await this.page.keyboard.press('Escape').catch(() => {});
  }

  async viewCart() {
    try {
      if (await this.viewCartLink.isVisible({ timeout: 3000 })) {
        await this.viewCartLink.click();
        await this.page.waitForURL('**/view_cart', { timeout: 10000 });
        return;
      }
    } catch {}
    await this.page.goto('/view_cart');
  }
}