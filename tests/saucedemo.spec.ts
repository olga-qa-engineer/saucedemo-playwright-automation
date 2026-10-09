import { test, expect } from '@playwright/test';

test('successful login with valid credentials', async ({ page }) => {
  // Open the SauceDemo website
  await page.goto('https://www.saucedemo.com/');

  // Enter the username
  await page.locator('[data-test="username"]').fill('standard_user');

  // Enter the password
  await page.locator('[data-test="password"]').fill('secret_sauce');

  // Click the Login button
  await page.locator('[data-test="login-button"]').click();

  // Verify that the Products page is displayed
  await expect(page).toHaveURL(/inventory.html/);
  await expect(
    page.getByText('Products', { exact: true })
  ).toBeVisible();
});

test('login fails with an incorrect password', async ({ page }) => {
  // Open the SauceDemo website
  await page.goto('https://www.saucedemo.com/');

  // Enter a valid username
  await page.locator('[data-test="username"]').fill('standard_user');

  // Enter an incorrect password
  await page.locator('[data-test="password"]').fill('wrong_password');

  // Click the Login button
  await page.locator('[data-test="login-button"]').click();

  // Verify that the error message is displayed
  await expect(
    page.locator('[data-test="error"]')
  ).toBeVisible();

  // Verify that the user stays on the login page
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('locked-out user cannot log in', async ({ page }) => {
  // Open the SauceDemo website
  await page.goto('https://www.saucedemo.com/');

  // Enter the locked-out user's credentials
  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');

  // Click the Login button
  await page.locator('[data-test="login-button"]').click();

  // Verify that the error message is displayed
  await expect(
    page.locator('[data-test="error"]')
  ).toBeVisible();

  // Verify that the error explains the account is locked
  await expect(
    page.locator('[data-test="error"]')
  ).toContainText('locked out');

  // Verify that the user remains on the login page
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('products page displays expected products and prices', async ({ page }) => {
  // Log in with valid credentials
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Verify that the Products heading is visible
  await expect(
    page.getByText('Products', { exact: true })
  ).toBeVisible();

  // Verify that two expected products are displayed
  await expect(
    page.getByText('Sauce Labs Backpack', { exact: true })
  ).toBeVisible();

  await expect(
    page.getByText('Sauce Labs Bike Light', { exact: true })
  ).toBeVisible();

  // Verify the expected prices
  await expect(
    page.getByText('$29.99', { exact: true })
  ).toBeVisible();

  await expect(
    page.getByText('$9.99', { exact: true })
  ).toBeVisible();
});

test('user can add a product to the shopping cart', async ({ page }) => {
  // Log in with valid credentials
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Add the Sauce Labs Backpack to the cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // Verify that the cart badge shows one item
  await expect(
    page.locator('[data-test="shopping-cart-badge"]')
  ).toHaveText('1');

  // Open the shopping cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Verify that the correct product appears in the cart
  await expect(
    page.getByText('Sauce Labs Backpack', { exact: true })
  ).toBeVisible();

  // Verify the product price in the cart
  await expect(
    page.getByText('$29.99', { exact: true })
  ).toBeVisible();
});

test('user can remove a product from the shopping cart', async ({ page }) => {
  // Log in with valid credentials
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Add the Backpack to the cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // Open the shopping cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Verify that the Backpack is in the cart
  await expect(
    page.getByText('Sauce Labs Backpack', { exact: true })
  ).toBeVisible();

  // Remove the Backpack
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

  // Verify that the Backpack is no longer in the cart
  await expect(
    page.getByText('Sauce Labs Backpack', { exact: true })
  ).toHaveCount(0);

  // Verify that the cart is empty
  await expect(
  page.locator('[data-test="cart-list"] .cart_item')
).toHaveCount(0);
});

test('checkout requires a first name', async ({ page }) => {
  // Log in
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Add a product to the cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // Open the cart and start checkout
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();

  // Leave the first name empty and fill in the other fields
  await page.locator('[data-test="lastName"]').fill('Tester');
  await page.locator('[data-test="postalCode"]').fill('SW1A 1AA');

  // Continue checkout
  await page.locator('[data-test="continue"]').click();

  // Verify that the required first-name error appears
  await expect(
    page.locator('[data-test="error"]')
  ).toContainText('First Name is required');
});

test('user can complete a purchase successfully', async ({ page }) => {
  // Log in
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Add the Backpack to the cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // Open the cart and start checkout
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();

  // Enter checkout information
  await page.locator('[data-test="firstName"]').fill('QA');
  await page.locator('[data-test="lastName"]').fill('Tester');
  await page.locator('[data-test="postalCode"]').fill('SW1A 1AA');

  // Continue to the order overview
  await page.locator('[data-test="continue"]').click();

  // Verify that the order overview is displayed
  await expect(
    page.getByText('Checkout: Overview', { exact: true })
  ).toBeVisible();

  // Finish the purchase
  await page.locator('[data-test="finish"]').click();

  // Verify the order confirmation
  await expect(
    page.getByText('Thank you for your order!', { exact: true })
  ).toBeVisible();
});
