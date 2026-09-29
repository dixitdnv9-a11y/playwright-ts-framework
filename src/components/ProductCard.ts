import { Locator } from '@playwright/test';
export class ProductCard {
  readonly root: Locator;
  readonly name: Locator;
  constructor(root: Locator) {
    this.root = root;
    this.name = root.locator('.productinfo p').first();
  }
  async getName(): Promise<string> {
    return (await this.name.textContent())?.trim() || '';
  }
  async addToCart() {
    await this.root.locator('a[data-product-id]').first().evaluate((el: HTMLElement) => el.click());
  }
  async viewProduct() {
    await this.root.locator('a:has-text("View Product")').first().click();
  }
}