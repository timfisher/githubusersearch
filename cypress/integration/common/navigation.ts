import { Given } from "cypress-cucumber-preprocessor/steps"

Given(`the user is on the search page`, () => {
  cy.visit("/")
})