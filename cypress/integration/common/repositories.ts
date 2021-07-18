import { Given, Then } from "cypress-cucumber-preprocessor/steps";

Given(`the user presses the {} button`, (buttonName: string) => {
  cy.findByRole("button", { name: buttonName }).click();
});

Then(`{string} is shown`, (message: string) => {
  cy.findByText(message);
});
