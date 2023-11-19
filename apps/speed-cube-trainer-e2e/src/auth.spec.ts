import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { deleteUser } from '../lib/supabase-admin-client';

test.describe('Authentication', () => {
  test('can sign up', async ({ page }) => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    await page.goto('/login');

    // Create account
    await page.getByLabel(/Email/i).fill(email);
    await page.getByLabel(/Password/i).fill(password);
    await page.getByText(/Sign Up/i).click();
    // Wait for sign up to be complete
    await expect(
      page.getByText(/Check email to continue sign in process/i)
    ).toBeVisible();
    // Sign in
    await page.getByRole('button', { name: 'Sign In' }).click();
    // Verify login was successful
    await expect(page.getByText(`Hey, ${email}!`)).toBeVisible();
    // Clean up
    await deleteUser(email);
  });
});
