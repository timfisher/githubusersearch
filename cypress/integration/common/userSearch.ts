import { Given, Then } from "cypress-cucumber-preprocessor/steps";

Given(`the user searches for {}`, (user: string) => {
  cy.findByRole("searchbox", { name: "Search for user" }).type(user);
});

Then(`the user selects the {} option`, (user: string) => {
  cy.findByRole("option", { name: user }).click();
});
