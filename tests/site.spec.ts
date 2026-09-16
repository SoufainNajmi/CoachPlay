import { test, expect } from '@playwright/test';
test('activity request, email payload and success', async ({ page }, testInfo) => {
  await page.route('https://api.emailjs.com/**', async route => {
    const payload = route.request().postDataJSON();
    expect(payload.template_params).toMatchObject({ client_name: 'Ahmed', client_email: 'ahmed@example.com', selected_activity: 'GAME', phone: '0600000000', message: 'Ready to play.' });
    await route.fulfill({status:200,contentType:'text/plain',body:'OK'});
  });
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('TRAIN. PLAY.');
  await page.locator('canvas').waitFor();
  await page.waitForTimeout(1500);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  const canvas = page.locator('canvas');
  const before = await canvas.screenshot();
  await page.mouse.move(100,100);
  await page.waitForTimeout(700);
  const after = await canvas.screenshot();
  expect(before.equals(after)).toBeFalsy();
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0), { timeout: 20000 }).toBeTruthy();
  }
  await page.evaluate(() => window.scrollTo({top:0,behavior:'instant'}));
  await page.screenshot({path:`test-results/${testInfo.project.name}-home.png`,fullPage:true});
  await page.getByRole('button',{name:'Select GAME',exact:true}).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button',{name:'CONFIRM',exact:true}).click();
  await page.getByRole('textbox',{name:'Name',exact:false}).fill('Ahmed');
  await page.getByRole('textbox',{name:'Email',exact:false}).fill('ahmed@example.com');
  await page.getByRole('textbox',{name:'Phone',exact:false}).fill('0600000000');
  await page.getByRole('textbox',{name:'Message',exact:false}).fill('Ready to play.');
  await page.screenshot({path:`test-results/${testInfo.project.name}-form.png`});
  await page.getByRole('button',{name:'CONFIRM',exact:true}).click();
  await expect(page.getByText('REQUEST SENT', {exact:true})).toBeVisible();
  await page.getByRole('button',{name:'BACK TO HOME'}).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
});
test('compact mobile and tablet remain within viewport', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop');
  for (const width of [320,768]) {
    await page.setViewportSize({width,height:900});
    await page.goto('/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    if (width === 320) {
      await page.getByRole('button',{name:'Open menu'}).click();
      await page.getByRole('navigation').getByRole('link',{name:'Activities',exact:true}).click();
      await expect(page.getByRole('button',{name:'Open menu'})).toHaveAttribute('aria-expanded','false');
    }
  }
});
test('failed request keeps input and allows retry; dialog navigation',async({page})=>{
  await page.route('https://api.emailjs.com/**', route=>route.fulfill({status:500,contentType:'text/plain',body:'Unavailable'}));
  await page.goto('/');
  await page.getByRole('button',{name:'BOOK A SESSION'}).click();
  await page.getByRole('textbox',{name:'Name',exact:false}).fill('Test Client');
  await page.getByRole('textbox',{name:'Email',exact:false}).fill('client@example.com');
  await page.getByRole('button',{name:'CONFIRM',exact:true}).click();
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.getByRole('textbox',{name:'Name',exact:false})).toHaveValue('Test Client');
  await expect(page.getByText('REQUEST SENT',{exact:true})).toHaveCount(0);
  await page.getByRole('button',{name:'Close',exact:true}).click();
  for(const activity of ['RUN','CARDIO','WORKOUT','COMBAT','GAME','CHALLENGE']) {
    await page.getByRole('button',{name:`Select ${activity}`,exact:true}).click();
    await expect(page.getByRole('dialog').getByRole('heading')).toHaveText(activity);
    await page.getByRole('button',{name:'BACK',exact:true}).click();
  }
});
