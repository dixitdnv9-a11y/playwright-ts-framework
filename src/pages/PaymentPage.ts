import { Page } from '@playwright/test';
export class PaymentPage {
  readonly page: Page;
  constructor(page: Page) { this.page = page; }
  async fillPaymentDetails(data: { nameOnCard: string; cardNumber: string; cvc: string; month: string; year: string }) {
    await this.page.locator('[data-qa="name-on-card"]').fill(data.nameOnCard);
    await this.page.locator('[data-qa="card-number"]').fill(data.cardNumber);
    await this.page.locator('[data-qa="cvc"]').fill(data.cvc);
    await this.page.locator('[data-qa="expiry-month"]').fill(data.month);
    await this.page.locator('[data-qa="expiry-year"]').fill(data.year);
  }
  async payAndConfirm() {
    await this.page.locator('[data-qa="pay-button"]').click();
  }
}