import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../core/BasePage';

export class LoginPage extends BasePage {
  readonly page: Page;
  readonly loginEmail: Locator;
  readonly loginPassword: Locator;
  readonly loginButton: Locator;
  readonly loginError: Locator;

  readonly signupName: Locator;
  readonly signupEmail: Locator;
  readonly signupButton: Locator;
  readonly signupError: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    // Login section
    this.loginEmail = page.locator('form').filter({ hasText: 'Login' }).locator('input[name="email"]').or(page.locator('[data-qa="login-email"]'));
    this.loginPassword = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.loginError = page.locator('form').filter({ hasText: 'Login' }).locator('p').filter({ hasText: /incorrect/i });

    // Signup section
    this.signupName = page.locator('[data-qa="signup-name"]');
    this.signupEmail = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.signupError = page.locator('form').filter({ hasText: 'New User' }).locator('p');
  }

  async goto() {
    await this.page.goto('/login');
    await expect(this.loginEmail).toBeVisible();
  }

  async login(email: string, password: string) {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }

  async signup(name: string, email: string) {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.signupButton.click();
    await this.page.waitForURL('**/signup');
  }
}
