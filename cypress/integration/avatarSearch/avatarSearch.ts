import { Then } from "cypress-cucumber-preprocessor/steps";

Then(`the {} avatar is shown`, (user: string) => {
  const imgAltName = `${user} avatar`;
  cy.findByRole("img", { name: imgAltName });
});
