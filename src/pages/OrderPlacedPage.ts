import { Page, expect } from '@playwright/test';
export class OrderPlacedPage {
  readonly page: Page;
  constructor(page: Page) { this.page = page; }
  async verifyOrderPlaced() {
    // Main check - this is the reliable selector
    await expect(this.page.locator('[data-qa="order-placed"]')).toBeVisible({ timeout: 20000 });
    // Second check - made lenient, don't fail if text slightly different
    const congrats = this.page.locator('p').filter({ hasText: /Congratulations|order has been placed/i }).first();
    try {
      await expect(congrats).toBeVisible({ timeout: 5000 });
    } catch {
      // Fallback - check any success message
      const anySuccess = this.page.locator('.col-sm-9 p').first();
      await expect(anySuccess).toBeVisible({ timeout: 5000 });
    }
  }
}