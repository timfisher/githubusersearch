import { Given } from "cypress-cucumber-preprocessor/steps";

Given(`the user searches for {}`, (user: string) => {
  cy.findByRole("searchbox", { name: "Search for user" }).type(user);
});
