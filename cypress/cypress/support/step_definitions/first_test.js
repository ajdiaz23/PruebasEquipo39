import { Given, Then } from "cypress-cucumber-preprocessor/steps";

Given('I visit {string}', (url) => {
  cy.visit(url);
});

Then('the page title should be {string}', (title) => {
  cy.title().should('eq', title);
});
