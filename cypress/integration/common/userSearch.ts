import { Given } from "cypress-cucumber-preprocessor/steps";

Given(`the user searches for {}`, (user: string) => {
  cy.findByRole("textbox", { name: "Search username:" }).type(user);
});
