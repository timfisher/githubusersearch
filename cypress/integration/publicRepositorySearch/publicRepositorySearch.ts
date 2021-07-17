import { Then } from "cypress-cucumber-preprocessor/steps";
import { anyCaseRegex } from "../common/helpers";

Then(`the {} is shown`, (respositoryName: string) => {
  const repositoryAriaLabel = `${respositoryName} repository`;
  cy.findByRole("listitem", { name: anyCaseRegex(repositoryAriaLabel) });
});
