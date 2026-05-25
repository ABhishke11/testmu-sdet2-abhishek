import { test, expect } from '../fixtures';
import { loadJSON } from '../../utils/dataLoader';

type UserData = {
  scenario: string;
  email: string;
  password: string;
  expectSuccess: boolean;
  expectedError?: string;
};

const users = loadJSON<UserData[]>('test_data/users.json');

test.describe('Login - UI', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  for (const user of users) {
    test(`login: ${user.scenario}`, async ({ loginPage }) => {
      await loginPage.loginAs(user.email, user.password);
      if (user.expectSuccess) {
        await loginPage.expectLoginSuccess();
      } else {
        await loginPage.expectLoginError(user.expectedError!);
      }
    });
  }

  test('login page has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Practice Software Testing/);
  });

  test('login fields are visible and interactive', async ({ page }) => {
    await expect(page.getByTestId('email')).toBeVisible();
    await expect(page.getByTestId('password')).toBeVisible();
    await expect(page.getByTestId('login-submit')).toBeEnabled();
  });

});