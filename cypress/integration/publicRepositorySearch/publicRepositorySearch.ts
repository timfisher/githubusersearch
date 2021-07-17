import { Given, Then } from "cypress-cucumber-preprocessor/steps";
import { SearchUserQuery } from "../../../src/apollo/queries";
import { anyCaseRegex } from "../common/helpers";

Then(`the {} is shown`, (respositoryName: string) => {
  const repositoryAriaLabel = `${respositoryName} repository`;
  cy.findByRole("listitem", { name: anyCaseRegex(repositoryAriaLabel) });
});

Given(`there are mock user results`, () => {
  cy.fixture("mockUserResults.json")
    .then((userResults: SearchUserQuery) => {
      cy.intercept("https://api.github.com/graphql", userResults);
    })
    .as("userResults");
});

Then(
  `the {} has {int} stars`,
  (respositoryName: string, numberOfStars: number) => {
    const repositoryAriaLabel = `${respositoryName} repository`;
    const starsAriaLabel = `${numberOfStars} users starred this repository`;
    cy.findByRole("listitem", {
      name: anyCaseRegex(repositoryAriaLabel),
    }).findByRole("generic", { name: starsAriaLabel });
  }
);

Then(
  `the {} has {int} watchers`,
  (respositoryName: string, numberOfWatchers: number) => {
    const repositoryAriaLabel = `${respositoryName} repository`;
    const watchersAriaLabel = `${numberOfWatchers} users watched this repository`;
    cy.findByRole("listitem", {
      name: anyCaseRegex(repositoryAriaLabel),
    }).findByRole("generic", { name: watchersAriaLabel });
  }
);

Then(`the repository {} has {int} watchers`, () => {
  cy.fixture("mockUserResults.json")
    .then((userResults: SearchUserQuery) => {
      cy.intercept("https://api.github.com/graphql", userResults);
    })
    .as("userResults");
});
