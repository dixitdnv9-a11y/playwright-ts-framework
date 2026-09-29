import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../core/BasePage';
import { ProductCard } from '../components/ProductCard';
import { APP_URLS } from '../constants/app.constants';

export class ProductsPage extends BasePage {
  readonly title: Locator;
  readonly allProductsList: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.features_items');
    this.allProductsList = page.locator('.features_items .col-sm-4');
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
  }

  async goto() {
    await super.goto(APP_URLS.PRODUCTS);
    await this.waitForVisible(this.title);
  }

  async getProductCount() {
    await this.allProductsList.first().waitFor({ state: 'attached', timeout: 20000 });
    return await this.allProductsList.count();
  }

  async getProductCards() {
    const count = await this.allProductsList.count();
    return Array.from({ length: count }, (_, i) => new ProductCard(this.allProductsList.nth(i)));
  }

  async addToCartByIndex(index: number) {
    const wrapper = this.allProductsList.nth(index);
    await wrapper.scrollIntoViewIfNeeded();
    const btn = wrapper.locator('a[data-product-id]').first();
    await btn.waitFor({ state: 'attached', timeout: 10000 });
    await this.safeClick(btn, { force: true });
  }

  async viewProductByIndex(index: number) {
    const link = this.allProductsList.nth(index).locator('a:has-text("View Product")').first();
    await this.safeClick(link);
  }

  async searchProduct(name: string) {
    await this.waitForVisible(this.searchInput);
    await this.fillInput(this.searchInput, name);
    await this.safeClick(this.searchButton);
  }
}
