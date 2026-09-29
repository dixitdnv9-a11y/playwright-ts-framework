import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../core/BasePage';
import { UserData } from '../data/user.factory';

export class SignupPage extends BasePage {
  readonly title: Locator;
  readonly genderMr: Locator;
  readonly password: Locator;
  readonly days: Locator;
  readonly months: Locator;
  readonly years: Locator;
  readonly newsletter: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly company: Locator;
  readonly address: Locator;
  readonly country: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly zipcode: Locator;
  readonly mobile: Locator;
  readonly createBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('b:has-text("Enter Account Information")');
    this.genderMr = page.locator('#id_gender1');
    this.password = page.locator('#password');
    this.days = page.locator('#days');
    this.months = page.locator('#months');
    this.years = page.locator('#years');
    this.newsletter = page.locator('#newsletter');
    this.firstName = page.locator('#first_name');
    this.lastName = page.locator('#last_name');
    this.company = page.locator('#company');
    this.address = page.locator('#address1');
    this.country = page.locator('#country');
    this.state = page.locator('#state');
    this.city = page.locator('#city');
    this.zipcode = page.locator('#zipcode');
    this.mobile = page.locator('#mobile_number');
    this.createBtn = page.locator('[data-qa="create-account"]');
  }

  async fillAccountDetails(data: UserData) {
    await this.genderMr.check();
    await this.fillInput(this.password, data.password);
    // FIXED: Use { label: } or value handling for days/months/years
    try {
      await this.days.selectOption(data.birthDay);
    } catch {
      await this.days.selectOption({ label: data.birthDay });
    }
    try {
      // months on site are names like "May", not numbers
      const monthMap: Record<string,string> = {
        '1':'January','2':'February','3':'March','4':'April','5':'May','6':'June',
        '7':'July','8':'August','9':'September','10':'October','11':'November','12':'December'
      };
      const monthLabel = monthMap[data.birthMonth] || data.birthMonth;
      await this.months.selectOption({ label: monthLabel });
    } catch {
      await this.months.selectOption(data.birthMonth).catch(()=>{});
    }
    try {
      await this.years.selectOption(data.birthYear);
    } catch {
      await this.years.selectOption({ label: data.birthYear });
    }
  }

  async fillAddressDetails(data: UserData) {
    await this.fillInput(this.firstName, data.firstName);
    await this.fillInput(this.lastName, data.lastName);
    await this.fillInput(this.company, data.company);
    await this.fillInput(this.address, data.address);
    // FIXED: Country select - use label
    try {
      await this.country.selectOption({ label: data.country });
    } catch {
      await this.country.selectOption(data.country).catch(()=>{});
    }
    await this.fillInput(this.state, data.state);
    await this.fillInput(this.city, data.city);
    await this.fillInput(this.zipcode, data.zipcode);
    await this.fillInput(this.mobile, data.mobile);
  }

  async submit() {
    await this.safeClick(this.createBtn);
  }
}
