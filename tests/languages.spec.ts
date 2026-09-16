import { test, expect } from '@playwright/test';

test('language selection persists and translates booking in French and Arabic', async ({ page }, testInfo) => {
  await page.route('https://api.emailjs.com/**', route => route.fulfill({ status: 200, contentType: 'text/plain', body: 'OK' }));
  await page.goto('/');
  await page.locator('.language-select').selectOption('fr');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page.locator('h1')).toContainText('BOUGEZ. JOUEZ.');
  await page.reload();
  await expect(page.locator('.language-select')).toHaveValue('fr');
  await page.getByRole('button', { name: 'Choisir JEU', exact: true }).click();
  await page.getByRole('button', { name: 'CONFIRMER', exact: true }).click();
  await page.getByRole('textbox', { name: 'Nom', exact: false }).fill('Marie');
  await page.getByRole('textbox', { name: 'Email', exact: false }).fill('marie@example.com');
  await page.getByRole('button', { name: 'CONFIRMER', exact: true }).click();
  await expect(page.getByText('DEMANDE ENVOYÉE', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: "RETOUR À L'ACCUEIL" }).click();
  await page.locator('.language-select').selectOption('ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('h1')).toContainText('تدرّب. العب.');
  await page.screenshot({ path: `test-results/${testInfo.project.name}-arabic.png` });
  await page.getByRole('button', { name: 'اختر اللعب', exact: true }).click();
  await page.getByRole('button', { name: 'تأكيد', exact: true }).click();
  await expect(page.getByRole('textbox', { name: 'الاسم', exact: false })).toBeVisible();
  await expect(page.locator('dialog select')).toHaveValue('game');
  await page.getByRole('button', { name: 'إغلاق', exact: true }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await page.locator('.language-select').selectOption('en');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.locator('h1')).toContainText('TRAIN. PLAY.');
});

test('translated layouts fit narrow mobile and tablet', async ({ page }) => {
  await page.goto('/');
  for (const language of ['fr', 'ar']) {
    await page.locator('.language-select').selectOption(language);
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
      const overflowingText = await page.locator('h1,h2,h3,.nav-inner,.activity-card').evaluateAll(elements => elements.filter(element => element.scrollWidth > element.clientWidth + 1).map(element => element.textContent));
      expect(overflowingText).toEqual([]);
    }
  }
});
