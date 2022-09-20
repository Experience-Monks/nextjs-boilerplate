import { Page } from '@playwright/test';

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */

export class MainPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://localhost:3000/');
  }
}
