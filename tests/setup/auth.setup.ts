import { test as setup, expect } from '@playwright/test';
import { UserFactory } from '../../src/data/user.factory';
import path from 'path';

const authFile = path.join(__dirname, '../../.auth/user.json');

setup('authenticate and save storage state', async ({ page }) => {
  const userData = UserFactory.create('auth_setup');
  
  await page.goto('/');
  await page.getByRole('link', { name: /signup \/ login/i }).click();
  await page.locator('[data-qa="signup-name"]').fill(userData.name);
  await page.locator('[data-qa="signup-email"]').fill(userData.email);
  await page.locator('[data-qa="signup-button"]').click();
  
  await page.locator('#id_gender1').check();
  await page.locator('#password').fill(userData.password);
  await page.locator('#days').selectOption('10');
  await page.locator('#months').selectOption('5');
  await page.locator('#years').selectOption('1995');
  await page.locator('#first_name').fill(userData.firstName);
  await page.locator('#last_name').fill(userData.lastName);
  await page.locator('#address1').fill(userData.address);
  await page.locator('#country').selectOption('India');
  await page.locator('#state').fill(userData.state);
  await page.locator('#city').fill(userData.city);
  await page.locator('#zipcode').fill(userData.zipcode);
  await page.locator('#mobile_number').fill(userData.mobile);
  await page.locator('[data-qa="create-account"]').click();
  
  await expect(page.getByText('Account Created!')).toBeVisible();
  await page.getByRole('link', { name: /continue/i }).click();
  
  await page.context().storageState({ path: authFile });
  console.log(`Auth state saved to ${authFile} for ${userData.email}`);
});
