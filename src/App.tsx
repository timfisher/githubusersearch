import { SearchResults, SearchUserInput } from "./components";

import styled from "styled-components";

// Defaults for search variables
// TODO change this number and paginate if the user has a lot of repositories
const MAX_REPOSITORIES = 25;
// TODO change this number and paginate if we require more user results
const MAX_USERS = 50;

/**
 * App containing a search input and search results for github users
 */
function App() {
  return (
    <AppContainer>
      <SearchUserInput />
      <SearchResults maxRepositories={MAX_REPOSITORIES} maxUsers={MAX_USERS} />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  padding: 20px;
`;

export default App;
