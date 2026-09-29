import { Page, expect } from '@playwright/test';
export class CheckoutPage {
  readonly page: Page;
  constructor(page: Page) { this.page = page; }
  async verifyAddressVisible() {
    await expect(this.page.locator('#address_delivery')).toBeVisible({ timeout: 15000 });
    await expect(this.page.locator('#cart_info')).toBeVisible();
  }
  async addComment(text: string) {
    await this.page.locator('textarea[name="message"]').fill(text);
  }
  async placeOrder() {
    await this.page.locator('a:has-text("Place Order")').click();
    await this.page.waitForURL('**/payment', { timeout: 15000 });
  }
}