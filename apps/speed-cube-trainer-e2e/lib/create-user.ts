import { faker } from '@faker-js/faker';
import { expect, Page } from '@playwright/test';

const createUser = async (page: Page) => {
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
};

export default createUser;
