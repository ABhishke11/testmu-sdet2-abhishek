import { test as base } from '@playwright/test';
import { LoginPage }     from '../pages/LoginPage';
import { dashboardPage } from '../pages/DashboardPage';
import { ProductPage }   from '../pages/ProductPage';

type AppFixtures = {
  loginPage:      LoginPage;
  dashboardPage:  dashboardPage;
  productPage:    ProductPage;
  authenticatedPage: ReturnType<typeof base['extend']> extends infer T ? T : never;
};

export const test = base.extend<{
  loginPage:     LoginPage;
  dashboardPage: dashboardPage;
  productPage:   ProductPage;
  loggedInPage:  void;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new dashboardPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  // Pre-authenticated fixture — logs in once before handing page to test
  loggedInPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.loginAs(
      'customer@practicesoftwaretesting.com',
      'welcome01'
    );
    await login.expectLoginSuccess();
    await use();
  },
});

export { expect } from '@playwright/test';