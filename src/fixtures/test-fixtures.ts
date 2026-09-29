import { test as base, expect } from '@playwright/test';
import { setupAdBlock, removeAdOverlays } from '../utils/ad-blocker';
import { pageFixtures } from './pages.fixture';
import { dataFixtures } from './data.fixture';

export const test = base.extend({
  page: async ({ page }, use) => {
    await setupAdBlock(page);
    // FIXED: Removed global dialog dismiss handler that was breaking ContactUsPage.accept()
    // ContactUs form needs dialog.accept(), but global handler already dismissed it
    page.on('domcontentloaded', async () => {
      await removeAdOverlays(page);
    });
    await use(page);
  },
  ...pageFixtures,
  ...dataFixtures,
});
export { expect };
