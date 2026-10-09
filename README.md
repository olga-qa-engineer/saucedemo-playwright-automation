# SauceDemo UI Test Automation

## Project Overview

This project contains automated UI tests for the [SauceDemo](https://www.saucedemo.com/) demo web application and forms part of my QA automation portfolio.

The tests use Playwright with TypeScript to verify key user journeys, login behaviour, product information, shopping cart functionality, and checkout validation.

## Technologies Used

* **Playwright Test** — browser automation and test assertions
* **TypeScript** — programming language
* **Node.js and npm** — JavaScript runtime and package management
* **Visual Studio Code** — development environment

## Test Coverage

The project currently includes eight automated test scenarios:

1. Successful login with valid credentials
2. Login failure with an incorrect password
3. Login failure for a locked-out user
4. Verification of product names and prices
5. Adding a product to the shopping cart
6. Removing a product from the shopping cart
7. Checkout validation when the first name is missing
8. Successful purchase from login through order confirmation

## Getting Started

### Prerequisites

* Node.js and npm
* Git, if cloning the repository
* A supported Playwright browser

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/olga-qa-engineer/saucedemo-playwright-automation.git
cd saucedemo-playwright-automation
```

Install the project dependencies:

```bash
npm install
```

Install the Chromium browser required by the tests:

```bash
npx playwright install chromium
```

### Running the Tests

Run the tests in headless mode:

```bash
npx playwright test --project=chromium
```

Run the tests with a visible browser:

```bash
npx playwright test --project=chromium --headed --workers=1
```

Open the HTML test report:

```bash
npx playwright show-report
```

## Skills Demonstrated

This project demonstrates my developing skills in:

* Writing automated UI tests using Playwright and TypeScript
* Using locators and assertions to verify application behaviour
* Testing positive and negative scenarios
* Validating shopping cart and checkout workflows
* Investigating test failures and refining test assertions


## Disclaimer

SauceDemo is a demonstration application. This project is intended for learning and portfolio purposes and does not involve real purchases or payments.
