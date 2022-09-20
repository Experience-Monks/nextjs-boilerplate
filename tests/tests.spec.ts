import { test } from '@playwright/test';
import { Landing } from './pageobjects/landing';

test.describe('Basic checks on the boilerplate', () => {
  test('the title lenght should be between 20 & 60 characters', async ({ page }) => {
    const landing = new Landing(page);
    await landing.goto();
    await landing.verifyTitleLenght();
  });

  test('should be only 1 H1', async ({ page }) => {
    const landing = new Landing(page);
    await landing.goto();
    await landing.verifyH1();
  });

  test('Cookie banner basic checks', async ({ page }) => {
    const landing = new Landing(page);
    await landing.goto();
    await landing.verifyCookieBanner();
  });

  test('The navbar should be present', async ({ page }) => {
    const landing = new Landing(page);
    await landing.goto();
    await landing.verifyNavbar();
  });

  test('The footer should be present', async ({ page }) => {
    const landing = new Landing(page);
    await landing.goto();
    await landing.verifyFooter();
  });
});
