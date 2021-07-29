# Github Search app

This project uses React, Apollo Client and Typescript to query data from the public GraphQL endpoint <https://api.github.com/graphql>

Types were generated from the public schema using @graphql-codegen and referenced for types such as User for user results, Repository for repositories within the user results and typeDefs generated for the client local state and combined with additional client vars to store the search input value and also the returned users for reference for the autocomplete suggestions. 

This project will not work without a github PAT. Once you have one insert it into .env as REACT_APP_GITHUB_AUTHTOKEN=<your PAT> see <https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token> for how to create a PAT. Tests marked @smoke will also not work locally without this token present.

To start the project add the PAT to .env and then use `yarn` and `yarn start` or check out the app on <https://githubsearch.caprover.tfisher.co.uk>.

The project uses Material UI components and a responsive grid for a responsive design that works on mobile. Any additional styling has been done with the Mui styling hooks or styled components for non Mui components.

The user can view the avatar username, real names and repository names/ watchers / stars of each repository.

I used Cypress BDD scenarios based off the user stories given for the spec and 100% code coverage was achieved using these. To generate a code coverage report start the project `yarn && yarn start` in one terminal and run `yarn test:e2e:run` in another terminal. This uses `cypress code coverage` to combine the unit test coverage to one report. The report is saved to /githubsearch/coverage/lcov-report/index.html. To run the tests in the test runner to see what is going on run `yarn && yarn start` in one terminal and run `yarn test:e2e` in another terminal. I have missed writing RTL integration tests in favour of Cypress to have easier TDD to see what I was writing but can write RTL style tests as well and we are 100% covered. Scenarios with @smoke tags are supposed to be run vs production code and real GQL calls to test the production code is working. The rest use mock responses to handle edge cases and faster loading using Cypress intercept. Cypress Testing library queries were used to ensure accessibile aria was used on components (using findByRole ensures the aria is suited for the element) and the app is screen reader/keyboard user friendly.

I have generated types using `yarn codegen` but because of the custom plugin to generate typeDefs (not included with the library) it does not work well with the ``` backticks in the comments. I would sort this script out with more time but manually replaced them in the generated typedefs. Please don't run this as it will break the app. In a usual workflow this could be automated to update everytime the schema updates.

There is a github workflow included that runs linting/tests the Cypress tests and has semantic release to automatically bump versions.

Improvements:

I have set the default repositories to be 25 which is the same as github use. This is because if you try and fetch more 502 errors happen because there is too much data returned. This could be improved with more time spent to paginate requests and also could be sorted by top starred repositories etc.

Maybe a separate page for when you click the user to display the results instead of a list.
