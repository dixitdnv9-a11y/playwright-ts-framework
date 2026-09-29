import { Page, Locator, expect, test } from '@playwright/test';
import { Logger } from '../utils/logger';

export abstract class BasePage {
  readonly page: Page;
  readonly logger: Logger;

  constructor(page: Page) {
    this.page = page;
    this.logger = new Logger(this.constructor.name);
  }

  async goto(path: string = '/') {
    await test.step(`Navigate to ${path}`, async () => {
      await this.page.goto(path, { waitUntil: 'domcontentloaded' });
      await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    });
  }

  async waitForVisible(locator: Locator, timeout = 15000) {
    await expect(locator).toBeVisible({ timeout });
  }

  async safeClick(locator: Locator, options: { force?: boolean; timeout?: number } = {}) {
    await test.step(`Click ${locator}`, async () => {
      await locator.waitFor({ state: 'attached', timeout: options.timeout || 10000 });
      await locator.scrollIntoViewIfNeeded().catch(() => {});
      if (options.force) {
        await locator.evaluate((el: HTMLElement) => el.click());
      } else {
        await locator.click({ timeout: options.timeout || 10000 }).catch(async () => {
          await locator.evaluate((el: HTMLElement) => el.click());
        });
      }
    });
  }

  async fillInput(locator: Locator, value: string) {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    await locator.clear().catch(() => {});
    await locator.fill(value);
  }

  protected async handleAds() {
    // Centralized ad removal - no waitForTimeout
    await this.page.evaluate(() => {
      const selectors = ['iframe[id^="aswift"]', '.adsbygoogle', '#ad', '[id*="google_ads"]'];
      selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => el.remove());
      });
    }).catch(() => {});
  }
}
