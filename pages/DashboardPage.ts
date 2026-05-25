import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class dashboardPage extends BasePage {
  private navHome        = this.page.getByTestId('nav-home');
  private productCards   = this.page.locator('[data-test="product"]');
  private searchInput    = this.page.getByTestId('search-query');
  private searchButton   = this.page.getByTestId('search-submit');
  private categoryList   = this.page.getByTestId('category');
  private sortDropdown   = this.page.getByTestId('sort');

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.navigate('/');
  }

  async searchFor(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
    await this.waitForPageLoad();
  }

  async getProductCount(): Promise<number> {
    return this.productCards.count();
  }

  async expectProductsVisible() {
    await expect(this.productCards.first()).toBeVisible({ timeout: 8000 });
  }

  async selectCategory(name: string) {
    await this.categoryList.filter({ hasText: name }).first().click();
    await this.waitForPageLoad();
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
    await this.waitForPageLoad();
  }
}