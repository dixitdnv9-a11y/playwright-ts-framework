import { Page, Locator, expect } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly loginLink: Locator;
  readonly testCasesLink: Locator;
  readonly loggedInAs: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.locator('header').getByRole('link', { name: /^home$/i });
    this.productsLink = page.locator('header').getByRole('link', { name: /^products$/i });
    this.cartLink = page.locator('header').getByRole('link', { name: /cart/i });
    this.loginLink = page.locator('header').getByRole('link', { name: /signup \/ login/i });
    this.testCasesLink = page.locator('header').getByRole('link', { name: /test cases/i });
    // FIXED: More robust - wait for nav, use ul.nav specifically
    this.loggedInAs = page.locator('ul.nav.navbar-nav').locator('text=Logged in as').first();
    this.logoutLink = page.getByRole('link', { name: /logout/i }).first();
    this.deleteAccountLink = page.getByRole('link', { name: /delete account/i }).first();
  }

  async verifyLoggedIn(username: string) {
    // FIXED: Wait for navigation and for element to be attached first
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.loggedInAs).toBeVisible({ timeout: 20000 });
    await expect(this.loggedInAs).toContainText(username, { timeout: 10000 });
  }
}
