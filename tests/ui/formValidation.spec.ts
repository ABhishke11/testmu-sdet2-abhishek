import { test, expect } from '../fixtures';
import { loadJSON } from '../../utils/dataLoader';

type FormData = {
  scenario: string;
  email: string;
  password: string;
  expectedError: string;
};

const formCases = loadJSON<FormData[]>('test_data/forms.json');

test.describe('Form Validation - UI', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  for (const formCase of formCases) {
    test(`validation: ${formCase.scenario}`, async ({ loginPage, page }) => {
      await loginPage.loginAs(formCase.email, formCase.password);
      const alert = page.getByRole('alert');
      await expect(alert).toBeVisible({ timeout: 5000 });
    });
  }

});