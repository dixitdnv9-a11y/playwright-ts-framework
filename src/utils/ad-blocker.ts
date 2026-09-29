import { Page } from '@playwright/test';
export async function setupAdBlock(page: Page){
  await page.route('**/*', route => {
    const url = route.request().url();
    if (url.includes('googlesyndication') || url.includes('doubleclick') || url.includes('googleads')) {
      return route.abort();
    }
    return route.continue();
  }).catch(()=>{});
}
export async function removeAdOverlays(page: Page){
  await page.evaluate(() => {
    document.querySelectorAll('iframe, .adsbygoogle').forEach(e=>e.remove());
  }).catch(()=>{});
}
