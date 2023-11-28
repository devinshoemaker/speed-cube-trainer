import test, { expect } from '@playwright/test';

import { createUser } from '../lib/create-user';

test.describe('OLL List', () => {
  test('should redirect if user is unauthenticated', async ({ page }) => {
    await page.goto('/oll-list');
    await expect(page).toHaveURL('/');
  });

  test('side menu should navigate to timer', async ({ page }) => {
    await createUser(page);
    await page.getByText(/OLL List/i).click();
    await expect(page).toHaveURL('/oll-list');
  });

  test('should render OLLs', async ({ page }) => {
    await createUser(page);
    await page.goto('/oll-list');
    await expect(page.getByTestId('algorithm-card')).toHaveCount(4);
  });
});
