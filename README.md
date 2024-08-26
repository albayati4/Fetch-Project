# Fake Gold Bar Finder - SDET Coding Challenge

## Overview

This project implements an automated solution to find a fake gold bar among nine using a balance scale. The fake bar weighs less than the others. The solution leverages Cypress for end-to-end testing and includes an algorithm to efficiently identify the fake bar.

### Date: 08/26/2024

### By: Abdullah Albayati

## Folder Structure

fake-gold-bar-finder/
│
├── cypress/
│ ├── e2e/
│ │ └── find_fake_gold_bar.cy.js
│ └── config.js
│
├── node_modules/
│
├── package.json
├── package-lock.json
└── README.md

## Interesting Code Snippet

Here’s a snippet from the `find_fake_gold_bar.cy.js` file that highlights how the script handles alerts from the website:

```javascript
// Cypress handles uncaught exceptions and alert messages
Cypress.on("uncaught:exception", () => {
  return false; // Prevent Cypress from failing due to uncaught exceptions
});

describe("Find the Fake Gold Bar", () => {
  it("should identify the fake bar and validate the result", () => {
    cy.visit("https://sdetchallenge.fetch.com");

    // Example of interacting with the website
    cy.get("#left_0").type("1");
    cy.get("#right_0").type("4");
    cy.get("#weigh").click();

    // Handle and verify the alert message
    cy.on("window:alert", (text) => {
      expect(text).to.include("Yay! You found it!");
    });
  });
});
```

Screenshot
Here’s a screenshot of a successful test passing:

![Image](https://i.ibb.co/zNQf3wP/Screenshot-2024-08-26-at-5-24-44-PM.png)

Setup

- Install Dependencies: (npm install)
- Run Tests: (npx cypress open)
  Select the test find_fake_gold_bar.cy.js to run it interactively or run all tests with: (npx cypress run)

How It Works
The automation script follows these steps:

- Opens the challenge website.
- Fills the left and right bowls with bar numbers for weighing.
- Executes the weigh operation and records the results.
- Analyzes the results to identify the fake bar using the implemented algorithm.
- Clicks on the suspected fake bar and verifies the alert message.

### Notes

- Exception Handling: Configured Cypress to handle uncaught exceptions gracefully during tests.
- Testing Environment: Ensure to run the tests in a compatible browser environment as specified in Cypress documentation.

### Contact

For further questions or feedback, please reach out to `Abdullah Albayati` at `albayati.abdullah4@gmail.com`.
