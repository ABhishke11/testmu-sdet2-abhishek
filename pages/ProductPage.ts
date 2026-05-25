import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  private productName     = this.page.getByTestId('product-name');
  private productPrice    = this.page.getByTestId('unit-price');
  private addToCartButton = this.page.getByTestId('add-to-cart');
  private cartCount       = this.page.getByTestId('cart-quantity');

  constructor(page: Page) {
    super(page);
  }

  async expectProductLoaded() {
    await expect(this.productName).toBeVisible({ timeout: 8000 });
  }

  async getProductName(): Promise<string | null> {
    return this.productName.textContent();
  }

  async getProductPrice(): Promise<string | null> {
    return this.productPrice.textContent();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async getCartCount(): Promise<string | null> {
    return this.cartCount.textContent();
  }
}