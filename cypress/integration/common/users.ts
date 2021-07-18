import { Given } from "cypress-cucumber-preprocessor/steps";
import { SearchUserQuery } from "../../../src/apollo/queries";

Given(`there are mock user results`, () => {
  cy.fixture("mockUserResults.json")
    .then((userResults: SearchUserQuery) => {
      cy.intercept("https://api.github.com/graphql", userResults);
    })
    .as("userResults");
});

Given(`there is a user with no repositories`, () => {
  cy.fixture("noRespositories.json")
    .then((userResults: SearchUserQuery) => {
      cy.intercept("https://api.github.com/graphql", userResults);
    })
    .as("noRepositoriesUser");
});
