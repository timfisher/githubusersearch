import { Given } from "cypress-cucumber-preprocessor/steps";
import { hasOperationName } from "../../utils/graphqlUtils";
import mockRespositoriesResults from "../../fixtures/mockRepositoriesResults.json"
import mockUserResults from "../../fixtures/mockUserResults.json"
import noRespositories from "../../fixtures/noRespositories.json"

Given(`there are mock user results`, () => {
  cy.intercept('POST', 'https://api.github.com/graphql', (req) => {
      if (hasOperationName(req, 'SearchUser')) {
        req.alias = 'gqlSearchUser'
        req.reply((res) => {
          res.body = mockUserResults
        }) 
      }
      if (hasOperationName(req, 'SearchUserRepositories')) {
        req.alias = 'gqlSearchUserRepositories'
        req.reply((res) => {
          res.body = mockRespositoriesResults
        }) 
      }
    })
});

Given(`there is a user with no repositories`, () => {
  cy.intercept('POST', 'https://api.github.com/graphql', (req) => {
      if (hasOperationName(req, 'SearchUser')) {
        req.alias = 'gqlSearchUser'
        req.reply((res) => {
          res.body = mockUserResults
        }) 
      }
      if (hasOperationName(req, 'SearchUserRepositories')) {
        req.alias = 'gqlSearchUserRepositories'
        req.reply((res) => {
          res.body = noRespositories
        }) 
      }
    })
});
