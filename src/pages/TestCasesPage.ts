import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../core/BasePage';

export class TestCasesPage extends BasePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('h2:has-text("Test Cases"), b:has-text("Test Cases")').first();
  }

  async verifyVisible() {
    await this.waitForVisible(this.heading);
  }
}
