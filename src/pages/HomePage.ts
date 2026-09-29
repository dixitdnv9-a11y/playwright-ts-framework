import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../core/BasePage';
import { APP_URLS } from '../constants/app.constants';

export class HomePage extends BasePage {
  readonly logo: Locator;
  readonly testCasesLink: Locator;
  readonly productsLink: Locator;
  readonly loginLink: Locator;
  readonly subscriptionText: Locator;
  readonly subscriptionEmail: Locator;
  readonly subscriptionBtn: Locator;
  readonly subscriptionSuccess: Locator;
  readonly categoryPanel: Locator;
  readonly brandsPanel: Locator;
  readonly recommendedItems: Locator;

  constructor(page: Page) {
    super(page);
    this.logo = page.locator('img[alt="Website for automation practice"]');
    this.testCasesLink = page.getByRole('link', { name: /test cases/i }).first();
    this.productsLink = page.locator('header').getByRole('link', { name: /products/i }).first();
    this.loginLink = page.locator('header').getByRole('link', { name: /signup \/ login/i }).first();
    this.subscriptionText = page.locator('h2:has-text("Subscription")').first();
    this.subscriptionEmail = page.locator('#susbscribe_email');
    this.subscriptionBtn = page.locator('#subscribe');
    this.subscriptionSuccess = page.locator('.alert-success');
    this.categoryPanel = page.locator('.left-sidebar').first();
    this.brandsPanel = page.locator('.brands_products').first();
    this.recommendedItems = page.locator('.recommended_items').first();
  }

  async goto() {
    await super.goto(APP_URLS.HOME);
    await this.waitForVisible(this.logo);
  }

  async goToProducts() {
    await this.safeClick(this.productsLink);
    await this.page.waitForURL('**/products', { timeout: 15000 });
  }

  // FIXED: Missing methods that old tests call
  async goToTestCases() {
    await this.safeClick(this.testCasesLink);
    await this.page.waitForURL('**/test_cases', { timeout: 15000 });
  }

  async goToCart() {
    await this.page.goto('/view_cart');
  }

  async verifySubscriptionVisible() {
    await this.subscriptionText.scrollIntoViewIfNeeded();
    await this.waitForVisible(this.subscriptionText);
  }

  async subscribe(email: string) {
    await this.subscriptionText.scrollIntoViewIfNeeded();
    await this.fillInput(this.subscriptionEmail, email);
    await this.safeClick(this.subscriptionBtn);
  }

  async verifySubscriptionSuccess() {
    await this.waitForVisible(this.subscriptionSuccess);
  }
}
