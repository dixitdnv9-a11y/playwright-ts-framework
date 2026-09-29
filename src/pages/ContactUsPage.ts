
import { Page, Locator, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

export class ContactUsPage {
  readonly page: Page;
  readonly getInTouchHeading: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly uploadInput: Locator;
  readonly submitBtn: Locator;
  readonly successMessage: Locator;
  readonly homeBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getInTouchHeading = page.locator('h2:has-text("Get In Touch")');
    this.nameInput = page.locator('[data-qa="name"]');
    this.emailInput = page.locator('[data-qa="email"]');
    this.subjectInput = page.locator('[data-qa="subject"]');
    this.messageInput = page.locator('[data-qa="message"]');
    this.uploadInput = page.locator('input[name="upload_file"]');
    this.submitBtn = page.locator('[data-qa="submit-button"]');
    this.successMessage = page.locator('.status.alert-success');
    this.homeBtn = page.locator('#form-section').getByRole('link', { name: /home/i });
  }

  async goto() {
    await this.page.goto('/contact_us');
    await expect(this.getInTouchHeading).toBeVisible();
  }

  async fillForm(data: { name: string; email: string; subject: string; message: string }) {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.subjectInput.fill(data.subject);
    await this.messageInput.fill(data.message);
  }

  async uploadFile() {
    // Create temp file if not exists
    const tmpPath = '/tmp/test_upload.txt';
    if (!fs.existsSync(tmpPath)) {
      fs.writeFileSync(tmpPath, 'test upload content for contact us');
    }
    await this.uploadInput.setInputFiles(tmpPath);
  }

  async submit() {
    // Handle the JS confirm dialog - must accept for this form
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
    await this.submitBtn.click();
  }

  async verifySuccess() {
    await expect(this.successMessage).toBeVisible({ timeout: 15000 });
    await expect(this.successMessage).toContainText(/Success! Your details have been submitted successfully/i);
  }

  async goHome() {
    await this.homeBtn.click();
    await this.page.waitForURL('**/');
  }
}
