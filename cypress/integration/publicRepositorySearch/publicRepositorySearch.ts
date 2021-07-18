import { Then } from "cypress-cucumber-preprocessor/steps";
import { SearchUserQuery } from "../../../src/apollo/queries";
import { anyCaseRegex } from "../common/helpers";

Then(`the {} is shown`, (respositoryName: string) => {
  const repositoryAriaLabel = `${respositoryName} repository`;
  cy.findByRole("button", { name: anyCaseRegex(repositoryAriaLabel) });
});

Then(
  `the {} has {int} stars`,
  (respositoryName: string, numberOfStars: number) => {
    const starsAriaLabel = `${numberOfStars} users starred this repository`;
    cy.findByRole("link", { name: starsAriaLabel });
  }
);

Then(
  `the {} has {int} watchers`,
  (respositoryName: string, numberOfWatchers: number) => {
    const watchersAriaLabel = `${numberOfWatchers} users watched this repository`;
    cy.findByRole("link", { name: watchersAriaLabel });
  }
);

Then(`the repository {} has {int} watchers`, () => {
  cy.fixture("mockUserResults.json")
    .then((userResults: SearchUserQuery) => {
      cy.intercept("https://api.github.com/graphql", userResults);
    })
    .as("userResults");
});
