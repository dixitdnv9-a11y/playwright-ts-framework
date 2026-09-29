import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../core/BasePage';
export class FooterComponent extends BasePage {
  readonly page: Page;
  constructor(page: Page) { this.page = page; }
  async verifyVisible() {
    await expect(this.page.locator('footer')).toBeVisible();
  }
}