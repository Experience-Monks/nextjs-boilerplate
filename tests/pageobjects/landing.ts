import { Page, expect } from '@playwright/test';

export class Landing {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators

  public get h1() {
    return this.page.locator('h1');
  }

  // Navbar

  public get navbar() {
    return this.page.locator('nav');
  }
  public get logo() {
    return this.page.locator('a[aria-label="Home"]');
  }
  public get about() {
    return this.page.locator('nav');
  }
  public get jam3Logo() {
    return this.page.locator('a[aria-label="Jam3"]');
  }
  public get github() {
    return this.page.locator('a[aria-label="GitHub"]');
  }

  // Cookie banner

  public get banner() {
    return this.page.locator('div[class*="CookieBanner_CookieBanner"]');
  }
  public get btnAccept() {
    return this.page.locator('div[class*="CookieBanner_CookieBanner"]>div>button:nth-child(1)');
  }
  public get btnReject() {
    return this.page.locator('div[class*="CookieBanner_CookieBanner"]>div>button:nth-child(2)');
  }

  // Footer

  public get footer() {
    return this.page.locator('footer');
  }

  async goto() {
    await this.page.goto('https://localhost:3000');
  }

  async verifyTitleLenght() {
    let title = await this.page.title();
    expect(title.length).toBeLessThanOrEqual(60);
    expect(title.length).toBeGreaterThanOrEqual(20);
  }

  async verifyH1() {
    let headers: String[] = await this.h1.allInnerTexts();
    expect(headers.length).toBe(1);
  }

  async verifyCookieBanner() {
    const banner = await this.banner;
    const accept = await this.btnAccept;
    const reject = await this.btnReject;

    await expect(banner).toBeVisible();
    await expect(accept).toBeVisible();
    await expect(reject).toBeVisible();
  }

  async verifyNavbar() {
    const navbar = await this.navbar;

    await expect(navbar).toBeVisible();
  }

  async verifyFooter() {
    const footer = await this.footer;

    await expect(footer).toBeVisible();
  }
}
