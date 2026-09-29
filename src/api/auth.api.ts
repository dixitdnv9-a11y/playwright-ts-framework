import { APIRequestContext, expect } from '@playwright/test';
import { ENV } from '../utils/env';
import { UserData } from '../data/user.factory';
import { Logger } from '../utils/logger';

export class AuthAPI {
  private logger = new Logger('AuthAPI');

  constructor(private request: APIRequestContext) {}

  // AutomationExercise doesn't have official API for user creation,
  // but enterprise pattern: we wrap UI creation in API-like helper for speed
  // and future migration to real API
  async deleteUserViaUI(page: any, email: string, password: string) {
    // Fallback UI deletion - used in cleanup
    this.logger.info(`Cleaning up user ${email}`);
    try {
      await page.goto('/login');
      await page.locator('[data-qa="login-email"]').fill(email);
      await page.locator('[data-qa="login-password"]').fill(password);
      await page.locator('[data-qa="login-button"]').click();
      await page.locator('a:has-text("Delete Account")').click({ timeout: 5000 });
    } catch (e) {
      this.logger.warn(`Cleanup failed for ${email}: ${e}`);
    }
  }
}
