import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly category: Locator;
  readonly price: Locator;
  readonly availability: Locator;
  readonly condition: Locator;
  readonly brand: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly reviewName: Locator;
  readonly reviewEmail: Locator;
  readonly reviewText: Locator;
  readonly reviewSubmit: Locator;
  readonly reviewSuccess: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('.product-information h2').first();
    this.category = page.locator('.product-information p').filter({ hasText: 'Category:' }).first();
    this.price = page.locator('.product-information span span').first();
    this.availability = page.locator('.product-information p').filter({ hasText: 'Availability:' }).first();
    this.condition = page.locator('.product-information p').filter({ hasText: 'Condition:' }).first();
    this.brand = page.locator('.product-information p').filter({ hasText: 'Brand:' }).first();
    this.quantityInput = page.locator('#quantity');
    this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
    this.reviewName = page.locator('#name');
    this.reviewEmail = page.locator('#email');
    this.reviewText = page.locator('#review');
    this.reviewSubmit = page.locator('#button-review');
    this.reviewSuccess = page.locator('span:has-text("Thank you for your review")');
  }

  async verifyProductDetailsVisible() {
    await expect(this.productName).toBeVisible();
    await expect(this.category).toBeVisible();
    await expect(this.price).toBeVisible();
    await expect(this.availability).toBeVisible();
  }

  async setQuantity(qty: number) {
    await this.quantityInput.fill(String(qty));
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async addReview(name: string, email: string, review: string) {
    await this.reviewName.fill(name);
    await this.reviewEmail.fill(email);
    await this.reviewText.fill(review);
    await this.reviewSubmit.click();
  }

  async verifyReviewSuccess() {
    await expect(this.reviewSuccess).toBeVisible({ timeout: 10000 });
  }
}
