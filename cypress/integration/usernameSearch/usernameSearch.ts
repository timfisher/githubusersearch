import { Given, Then } from "cypress-cucumber-preprocessor/steps";
import { SearchUserQuery } from "../../../src/apollo/queries";

Then(`the {} is shown as a user`, (name: string) => {
  // This should have an aria role of heading, looks like a mui bug 😳
  cy.findByText(name);
});

Then(`the user sees {string}`, (message: string) => {
  cy.findByText(message);
});

Given(`the user search returns an error`, () => {
  cy.intercept("https://api.github.com/graphql", (req) => {
    req.destroy();
  });
});

Given(`the user search returns no user results`, () => {
  cy.fixture("noUserResults.json")
    .then((noUserResults: SearchUserQuery) => {
      cy.intercept("https://api.github.com/graphql", noUserResults);
    })
    .as("noUserResults");
});
