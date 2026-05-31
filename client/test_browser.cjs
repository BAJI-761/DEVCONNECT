const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      console.log(`[BROWSER ${msg.type().toUpperCase()}]`, msg.text());
    }
  });

  page.on('pageerror', error => {
    console.log(`[BROWSER UNCAUGHT EXCEPTION]`, error.message);
  });

  console.log('Navigating to http://localhost:3000...');
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 10000 });
    console.log('Navigation complete. Waiting 2s for any late errors...');
    await page.waitForTimeout(2000);
  } catch (err) {
    console.log('Error navigating:', err.message);
  }

  await browser.close();
})();
