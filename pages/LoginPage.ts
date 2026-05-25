import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private emailInput    = this.page.getByTestId('email');
  private passwordInput = this.page.getByTestId('password');
  private loginButton   = this.page.getByTestId('login-submit');
  private errorAlert    = this.page.getByRole('alert');
  private navUserMenu   = this.page.getByTestId('nav-user-menu');

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.navigate('/auth/login');
  }

  async loginAs(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginSuccess() {
    await expect(this.navUserMenu).toBeVisible({ timeout: 8000 });
  }

  async expectLoginError(message: string) {
    await expect(this.errorAlert).toBeVisible();
    await expect(this.errorAlert).toContainText(message);
  }

  async getErrorMessage(): Promise<string | null> {
    return this.errorAlert.textContent();
  }
}